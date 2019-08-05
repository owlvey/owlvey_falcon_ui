import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Observable } from 'rxjs/Rx';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHandler, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager: UserManager = new UserManager(getClientSettings());
  private user: User;
  _authHeaders: Headers;

  constructor(
    protected client: HttpClient,
    private authService: AuthenticationService
  ) {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  //getUser(): User {
  //  if (this.user == null) {
  //    const authJSON = localStorage.getItem('auth');

  //    if (authJSON !== null && authJSON !== undefined) {
  //      this.user = JSON.parse(authJSON);
  //    }
  //  }

  //  return this.user;
  //}

  getUserId(): string {
    //const user = this.getUser();
    //if (user === undefined || user === null) {
    //  return '';
    //}
    //return this.getUser().profile.sub;
    return this.authService.getUserId();
  }

  getUserName(): string {
    //const user = this.getUser();
    //if (user === undefined || user === null) {
    //  return '';
    //}
    //return this.getUser().profile.full_name;
    return this.authService.getUserFullName();
  }

  getFirstName(): string {
    //const user = this.getUser();
    //if (user === undefined || user === null) {
    //  return '';
    //}
    //return this.getUser().profile.firstName;
    return this.authService.getUserFirstName();
  }

  getLastName(): string {
    //const user = this.getUser();
    //if (user === undefined || user === null) {
    //  return '';
    //}
    //return this.getUser().profile.lastName;
    return this.authService.getUserLastName();
  }

  getUserEmail(): string {
    //const user = this.getUser();
    //if (user === undefined || user === null) {
    //  return '';
    //}
    //return this.getUser().profile.email;
    return this.authService.getUserEmail();
  }

  //getCurrentTenantId(): string {
  //  const user = this.getUser();
  //  if (user === undefined || user === null) {
  //    return '';
  //  }
  //  return this.getUser().profile.tenant_id;
  //}

  //getUserPhoneNumber(): string {
  //  const user = this.getUser();
  //  if (user === undefined || user === null) {
  //    return '';
  //  }
  //  return this.getUser().profile.phoneNumber;
  //}

  isLoggedIn(): boolean {
    //return this.getUser() != null && !this.getUser().expired;
    return this.authService.isAuthenticated();
  }

  //isAuthorized(authorizedRoles: string[]): boolean {
  //  const isLogged = this.getUser() != null;
  //  if (!isLogged) {
  //    return false;
  //  }

  //  const roles = this.getUser().profile.role;
  //  for (const role of authorizedRoles) {
  //    if (roles.indexOf(role) !== -1) {
  //      return true;
  //    }
  //  }

  //  return false;
  //}

  //hasProfile(authorizedRoles: string[]): boolean {
  //  const profiles = this.getUser().profile.profile;

  //  for (const role of authorizedRoles) {

  //    for (let p of profiles) {
  //      if (p.indexOf(role) !== -1) {
  //        return true;
  //      }
  //    }

  //  }

  //  return false;
  //}


  //getClaims(): any {
  //  return this.getUser().profile;
  //}

  //getAuthorizationHeaderValue(): string {

  //  const tokenType = this.getUser().token_type;
  //  const accessToken = this.getUser().access_token;

  //  return `${tokenType} ${accessToken}`;
  //}

  getToken(): string {
    //const accessToken = this.getUser().access_token;

    //return accessToken;
    return this.authService.getAuthenticationToken();
  }

  getAccessToken(): string {
    const accessToken = this.authService.getTokenModel().access_token;

    //return accessToken;
    return accessToken;
  }

  //startAuthentication(): Promise<void> {
  //  return this.manager.signinRedirect();
  //}

  //endAuthentication(): Promise<void> {
    //return this.manager.signoutRedirect();
  //}

  endAuthentication() {
    this.authService.endAuthentication();
  }

  //completeAuthentication(): Promise<void> {
  //  return this.manager.signinRedirectCallback().then(user => {
  //    this.user = user;
  //    localStorage.setItem('auth', JSON.stringify(user));

  //    window.location.href = '/';

  //  });
  //}

  //Post(url: string, payload?: any): Observable<Object> {
  //  let headers = this.setJsonHttpOptions();
  //  headers = this.setAuthentication(headers);
  //  return this.client.post(url, payload, { headers: headers });
  //}
  //Get<T>(url: string): Observable<T> {
  //  let headers = this.setJsonHttpOptions();
  //  headers = this.setAuthentication(headers);
  //  return this.client.get<T>(url, { headers: headers });
  //}
  //Put(url: string, payload?: any): Observable<Object> {
  //  let headers = this.setJsonHttpOptions();
  //  headers = this.setAuthentication(headers);
  //  return this.client.put(url, payload, { headers: headers });
  //}
  //Patch(url: string, payload?: any): Observable<Object> {
  //  let headers = this.setJsonHttpOptions();
  //  headers = this.setAuthentication(headers);
  //  return this.client.patch(url, payload, { headers: headers });
  //}
  //Delete(url: string): Observable<Object> {
  //  let headers = this.setJsonHttpOptions();
  //  headers = this.setAuthentication(headers);
  //  return this.client.delete(url, { headers: headers });
  //}

  //private setJsonHttpOptions(): HttpHeaders {
  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //  return headers;
  //}

  //private setAuthentication(headers: HttpHeaders): HttpHeaders {
  //  headers = headers.set('Authorization', this.getUser().token_type + ' ' + this.getUser().access_token);
  //  return headers;
  //}
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authority,
    client_id: environment.clientId,
    redirect_uri: window.location.origin + '/signin-oidc',
    post_logout_redirect_uri: window.location.origin + '/signout-callback-oidc',
    response_type: 'id_token token',
    scope: 'openid profile api_pipelinespace offline_access',
    filterProtocolClaims: true,
    loadUserInfo: true,
    // automaticSilentRenew: true,
    // silent_redirect_uri: window.location.origin + '/silent-refresh.html'
  };
}

