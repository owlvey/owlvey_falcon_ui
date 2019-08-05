import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      //console.log("Error", err)
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          window.localStorage.removeItem('auth');
          window.location.href = '/';
        } else if (err.status === 409 && err.url.indexOf("tokens/refresh") > -1) {
          this.auth.endAuthentication()
        }
      }
    });
  }
}
