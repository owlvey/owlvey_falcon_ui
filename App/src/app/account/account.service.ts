import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.api;
  }

  login(model: any) {

    // const headers = new Headers();
    // headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // const body = new FormData();
    // body.set('grant_type', 'password');
    // body.set('client_id', environment.clientId);
    // body.set('client_secret', 'J16o86432t0bE3K');
    // body.set('scope', 'openid profile api_pipelinespace offline_access');
    // body.set('username', model.username);
    // body.set('password', model.password);

    return this.http.post(this.baseUrl + 'users/login', model);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'users/register', model);
  }

  forgotPassword(model: any) {
    
    return this.http.post(this.baseUrl + 'users/forgotPassword', model);
  }

}
