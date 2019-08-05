import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    //private authService: AuthService,
    private authService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isLogged = this.authService.isAuthenticated();

    if (isLogged) {
      return true;
    }   else    {
      //this.authService.startAuthentication();
      this.authService.startAuthentication();
      return false;
    }
  }
}
