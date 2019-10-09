import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EnvironmentService } from "../utils/env.service";
import { environment } from "./../../../environments/environment";

@Injectable()
export class UsersGateway {
  baseUrl: string;
  identityUrl: string;
  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
    this.identityUrl = envService.getUrl(
      environment.authority,
      environment.type
    );
  }
  getUserIdentity(): Observable<any> {
    return this.http.get(this.identityUrl + `api/account/me`);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + `users`);
  }
  getUser(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + `users/${userId}`);
  }
  createUser(model: any) {
    return this.http.post(this.baseUrl + "users", model);
  }
  updateUser(id: number, model: any) {
    return this.http.put(this.baseUrl + `users/${id}`, model);
  }
}
