import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
import { NbAuthStrategy, NbOAuth2AuthStrategyOptions, NbAuthStrategyClass, NbOAuth2ResponseType, NbAuthResult, NbAuthIllegalTokenError, NbAuthRefreshableToken, NbOAuth2ClientAuthMethod, NbAuthToken, auth2StrategyOptions, NbOAuth2GrantType } from '@nebular/auth';
import { debug } from 'util';

@Injectable()
export class OwlveyOAuth2AuthStrategy extends NbAuthStrategy {

  static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [OwlveyOAuth2AuthStrategy, options];
  }

  get responseType() {
    return this.getOption('authorize.responseType');
  }

  get clientAuthMethod() {
    return this.getOption('clientAuthMethod');
  }

  protected redirectResultHandlers: { [key: string]: Function } = {
    [NbOAuth2ResponseType.CODE]: () => {
      return observableOf(this.route.snapshot.queryParams).pipe(
        switchMap((params: any) => {
          if (params.code) {
            return this.requestToken(params.code)
          }

          return observableOf(
            new NbAuthResult(
              false,
              params,
              this.getOption('redirect.failure'),
              this.getOption('defaultErrors'),
              [],
            ));
        }),
      );
    },
    [NbOAuth2ResponseType.TOKEN]: () => {
      const module = 'authorize';
      const requireValidToken = this.getOption(`${module}.requireValidToken`);
      return observableOf(this.route.snapshot.fragment).pipe(
        map(fragment => this.parseHashAsQueryParams(fragment)),
        map((params: any) => {
          if (!params.error) {
            return new NbAuthResult(
              true,
              params,
              this.getOption('redirect.success'),
              [],
              this.getOption('defaultMessages'),
              this.createToken(params, requireValidToken));
          }
          return new NbAuthResult(
            false,
            params,
            this.getOption('redirect.failure'),
            this.getOption('defaultErrors'),
            [],
          );
        }),
        catchError(err => {
          const errors = [];
          if (err instanceof NbAuthIllegalTokenError) {
            errors.push(err.message)
          } else {
            errors.push('Something went wrong.');
          }
          return observableOf(
            new NbAuthResult(
              false,
              err,
              this.getOption('redirect.failure'),
              errors,
            ));
        }),
      );
    },
  };

  protected redirectResults: { [key: string]: Function } = {
    [NbOAuth2ResponseType.CODE]: () => {
      return observableOf(this.route.snapshot.queryParams).pipe(
        map((params: any) => !!(params && (params.code || params.error))),
      );
    },
    [NbOAuth2ResponseType.TOKEN]: () => {
      return observableOf(this.route.snapshot.fragment).pipe(
        map(fragment => this.parseHashAsQueryParams(fragment)),
        map((params: any) => !!(params && (params.access_token || params.error))),
      );
    },
  };

  protected defaultOptions: NbOAuth2AuthStrategyOptions = auth2StrategyOptions;

  constructor(protected http: HttpClient,
              protected route: ActivatedRoute,
              @Inject(NB_WINDOW) protected window: any) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {

    if (this.getOption('token.grantType') === NbOAuth2GrantType.PASSWORD) {
      return this.passwordToken(data.email, data.password)
    } else {
      return this.isRedirectResult()
        .pipe(
          switchMap((result: boolean) => {
            if (!result) {
              this.authorizeRedirect();
              return observableOf(new NbAuthResult(true));
            }
            return this.getAuthorizationResult();
          }),
        );
    }
  }

  getAuthorizationResult(): Observable<any> {
    const redirectResultHandler = this.redirectResultHandlers[this.responseType];
    if (redirectResultHandler) {
      return redirectResultHandler.call(this);
    }

    throw new Error(`'${this.responseType}' responseType is not supported,
                      only 'token' and 'code' are supported now`);
  }

  refreshToken(token: NbAuthRefreshableToken): Observable<NbAuthResult> {
    const module = 'refresh';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    let headers = this.buildAuthHeader() || new HttpHeaders() ;
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, this.buildRefreshRequestData(token), { headers: headers })
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createRefreshedToken(res, token, requireValidToken));
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

  passwordToken(username: string, password: string): Observable<any> {
    const module = 'token';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    let headers = this.buildAuthHeader() || new HttpHeaders() ;
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');    
    const body = this.buildPasswordRequestData(username, password);
    const temp = this.http.post(url, body , { headers: headers });  
    return temp;
  }

  protected authorizeRedirect() {
    this.window.location.href = this.buildRedirectUrl();
  }

  protected isRedirectResult(): Observable<boolean> {
    return this.redirectResults[this.responseType].call(this);
  }

  protected requestToken(code: string) {

    const module = 'token';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    let headers = this.buildAuthHeader() || new HttpHeaders() ;
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, this.buildCodeRequestData(code), { headers: headers })
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createToken(res, requireValidToken));
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

  protected buildCodeRequestData(code: string): any {
    const params = {
      grant_type: this.getOption('token.grantType'),
      code: code,
      redirect_uri: this.getOption('token.redirectUri'),
      client_id: this.getOption('clientId'),
    };
    return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
  }

  protected buildRefreshRequestData(token: NbAuthRefreshableToken): any {
    const params = {
      grant_type: this.getOption('refresh.grantType'),
      refresh_token: token.getRefreshToken(),
      scope: this.getOption('refresh.scope'),
    };
    return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
  }

  protected buildPasswordRequestData(username: string, password: string ): string {
    const params = {
      grant_type: this.getOption('token.grantType'),
      username: username,
      password: password,
      scope: this.getOption('token.scope'),
    };
    return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
  }

  protected buildAuthHeader(): any {
    if (this.clientAuthMethod === NbOAuth2ClientAuthMethod.BASIC) {
      if (this.getOption('clientId') && this.getOption('clientSecret')) {
        return new HttpHeaders(
            {
              'Authorization': 'Basic ' + btoa(
                this.getOption('clientId') + ':' + this.getOption('clientSecret')),
            },
          );
      } else {
        throw Error('For basic client authentication method, please provide both clientId & clientSecret.');
      }
    }
  }

  protected cleanParams(params: any): any {
    Object.entries(params)
      .forEach(([key, val]) => !val && delete params[key]);
    return params;
  }

  protected addCredentialsToParams(params: any): any {
    if (this.clientAuthMethod === NbOAuth2ClientAuthMethod.REQUEST_BODY) {
      if (this.getOption('clientId') && this.getOption('clientSecret')) {
        return {
          ... params,
          client_id: this.getOption('clientId'),
          client_secret: this.getOption('clientSecret'),
        }
      } else {
        throw Error('For request body client authentication method, please provide both clientId & clientSecret.')
      }
    }
    return params;
  }


  protected handleResponseError(res: any): Observable<NbAuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      if (res.error.error_description) {
        errors.push(res.error.error_description);
      } else {
        errors = this.getOption('defaultErrors');
      }
    }  else if (res instanceof NbAuthIllegalTokenError ) {
      errors.push(res.message)
    } else {
        errors.push('Something went wrong.')
    };

    return observableOf(
      new NbAuthResult(
        false,
        res,
        this.getOption('redirect.failure'),
        errors,
        [],
      ));
  }

  protected buildRedirectUrl() {
    const params = {
      response_type: this.getOption('authorize.responseType'),
      client_id: this.getOption('clientId'),
      redirect_uri: this.getOption('authorize.redirectUri'),
      scope: this.getOption('authorize.scope'),
      state: this.getOption('authorize.state'),

      ...this.getOption('authorize.params'),
    };

    const endpoint = this.getActionEndpoint('authorize');
    const query = this.urlEncodeParameters(this.cleanParams(params));

    return `${endpoint}?${query}`;
  }

  protected parseHashAsQueryParams(hash: string): { [key: string]: string } {
    return hash ? hash.split('&').reduce((acc: any, part: string) => {
      const item = part.split('=');
      acc[item[0]] = decodeURIComponent(item[1]);
      return acc;
    }, {}) : {};
  }

  protected urlEncodeParameters(params: any): string {
    return Object.keys(params).map((k) => {
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    }).join('&');
  }

  protected createRefreshedToken(res, existingToken: NbAuthRefreshableToken, requireValidToken: boolean): NbAuthToken {
    type AuthRefreshToken = NbAuthRefreshableToken & NbAuthToken;

    const refreshedToken: AuthRefreshToken = this.createToken<AuthRefreshToken>(res, requireValidToken);
    if (!refreshedToken.getRefreshToken() && existingToken.getRefreshToken()) {
      refreshedToken.setRefreshToken(existingToken.getRefreshToken());
    }
    return refreshedToken;
  }

  register(data?: any): Observable<NbAuthResult> {
    throw new Error('`register` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error('`requestPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    throw new Error('`resetPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
  }

  logout(): Observable<NbAuthResult> {
    return observableOf(new NbAuthResult(true));
  }
}