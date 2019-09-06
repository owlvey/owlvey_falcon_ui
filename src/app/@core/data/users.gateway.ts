import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class UsersGateway {
    baseUrl: string;
    constructor(private http: HttpClient,
              private envService: EnvironmentService) {
      this.baseUrl = envService.getUrl(environment.api, environment.type);
    }

    getUsers() : Observable<any>{
        return this.http.get(this.baseUrl + `users`);
    }
    getUser(userId: number) : Observable<any>{
        return this.http.get(this.baseUrl + `users/${userId}`);
    }
    createUser(model: any) {
        return this.http.post(this.baseUrl + 'users', model);
    }
}