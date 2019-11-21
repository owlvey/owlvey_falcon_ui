import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EnvironmentService } from "../utils/env.service";
import { environment } from "./../../../environments/environment";
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class UsersGateway {
  baseUrl: string;
  identityUrl: string;
  constructor(
    private http: HttpClient,
    private owlveyGateway : OwlveyGateway,
    private envService: EnvironmentService
  ) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
    this.identityUrl = envService.getUrl(
      environment.authority,
      environment.type
    );
  }
  getUserIdentity(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `accounts/me`);
  }
  getUsers(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `users`);
  }
  getUser(userId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `users/${userId}`);
  }
  createUser(model: any) {
    return this.owlveyGateway.post(this.baseUrl + "users", model);
  }
  updateUser(id: number, model: any) {
    return this.owlveyGateway.put(this.baseUrl + `users/${id}`, model);
  }
  deleteProduct(id: number) {
    return this.owlveyGateway.delete(this.baseUrl + "users/" + id);
  }
}
