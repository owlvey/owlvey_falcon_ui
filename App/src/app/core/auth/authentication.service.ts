import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserInfo, AuthorizationToken } from './authentication.class';
import { UtilsService } from '../../utils.service';

export const AuthorizationSettings = {
  loginRedirectUrl: "/",
  tokenKey: "__authToken__",
  userKey: "__userInfo__",
  expireDateKey: "__expireDate__",
  refreshTokenEvery: 15,
  loginUrl: "/account/sign-in",
  registerUrl: "/account/sign-up",
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string;
  coreUrl: string;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) {
    this.baseUrl = environment.authority;
    this.coreUrl = environment.api;
  }

  startAuthentication() {
    this.clearAuthenticationInfo();
    window.location.href = AuthorizationSettings.loginUrl;
  }

  endAuthentication() {
    this.clearAuthenticationInfo();
    window.location.href = AuthorizationSettings.loginUrl;
  }

  clearAuthenticationInfo() {
    this.utilsService.removeLocalItem(AuthorizationSettings.userKey);
    this.utilsService.removeLocalItem(AuthorizationSettings.tokenKey);
    this.utilsService.removeLocalItem(AuthorizationSettings.expireDateKey);
  }

  saveAuthenticationToken(data: AuthorizationToken) {
    this.utilsService.saveLocalItem(AuthorizationSettings.tokenKey, data);
    this.saveExpireDate();
  }

  saveExpireDate() {
    let now: Date = new Date()
    now.setHours(now.getHours() + 1);

    this.utilsService.saveLocalItem(AuthorizationSettings.expireDateKey, now.toString());
  }

  saveRefreshingToken() {
    this.utilsService.saveLocalItem("__refreshing__", true);
  }

  refreshToken() {
    let token: AuthorizationToken = this.getTokenModel();
    let refreshModel = {
      refreshToken: token.refresh_token
    }

    this.http.post(`${this.coreUrl}tokens/refresh`, refreshModel)
      .toPromise()
      .then((token: AuthorizationToken) => {
        this.saveAuthenticationToken(token);
        console.log("Token Refreshed");
        window.location.reload();
      });
  }

  getTokenModel(): AuthorizationToken {
    let token: AuthorizationToken = this.utilsService.getLocalItem(AuthorizationSettings.tokenKey);
    return token;
  }

  getAuthenticationToken(): string {
    let token: AuthorizationToken = this.getTokenModel();
    if (token)
      return `${token.token_type} ${token.access_token}`;
    return "";
  }

  getUserInfo(data: AuthorizationToken) {
    this.saveAuthenticationToken(data);

    this.http.get(`${this.baseUrl}connect/userinfo`).subscribe((response: UserInfo) => {
      this.utilsService.saveLocalItem(AuthorizationSettings.userKey, response);

      window.location.href = AuthorizationSettings.loginRedirectUrl;
    });
  }

  getUserInfoWithRedirect(data: AuthorizationToken, url) {
    this.saveAuthenticationToken(data);

    this.http.get(`${this.baseUrl}connect/userinfo`).subscribe((response: UserInfo) => {
      this.utilsService.saveLocalItem(AuthorizationSettings.userKey, response);

      window.location.href = url;
    });
  }

  getExpireDate() {
    return new Date(this.utilsService.getLocalItem(AuthorizationSettings.expireDateKey));
  }

  getUser() {
    return this.utilsService.getLocalItem(AuthorizationSettings.userKey);
  }

  getUserFullName(): string {
    let user: UserInfo = this.getUser();
    if (user) {
      return user.fullname;
    }

    return "";
  }

  getUserFirstName(): string {
    let user: UserInfo = this.getUser();
    if (user) {
      return user.firstName;
    }

    return "";
  }

  getUserLastName(): string {
    let user: UserInfo = this.getUser();
    if (user) {
      return user.lastName;
    }

    return "";
  }

  getUserEmail(): string {
    let user: UserInfo = this.getUser();
    if (user) {
      return user.email;
    }

    return "";
  }

  getUserId(): string {
    let user: UserInfo = this.getUser();

    if (user) {
      return user.owneridentifier;
    }

    return "";
  }

  isTokenNearToExpire(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    let now: any = new Date();
    let expireDate: any = this.getExpireDate();

    let diffMs = (expireDate - now);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    if (diffMins < AuthorizationSettings.refreshTokenEvery) {
      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    let user: UserInfo = this.getUser();

    if (user) {
      return true;
    }

    return false;
  }
}


