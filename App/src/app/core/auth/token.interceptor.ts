
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { AuthorizationToken } from './authentication.class';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    //public auth: AuthService
    private auth: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(request.url);
    if (request.url.indexOf("content.googleapis") < 0 &&
      request.url.indexOf("users/login") < 0 &&
      request.url.indexOf("users/register") < 0 &&
      request.url.indexOf("tokens/refresh") < 0 &&
      request.url.indexOf("users/forgotPassword") < 0) {

      if (this.auth.isTokenNearToExpire()) {
        this.auth.refreshToken();
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: this.auth.getAuthenticationToken()
          }
        });

        return next.handle(request);
      }
    } else {
      return next.handle(request);
    }
  }
}
