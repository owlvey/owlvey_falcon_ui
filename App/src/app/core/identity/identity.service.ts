import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Identity } from './identity.class';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.authority;
  }

  getIdentity(id: string) {
    return this.http.get(this.baseUrl + '/users/' + id);
  }
}
