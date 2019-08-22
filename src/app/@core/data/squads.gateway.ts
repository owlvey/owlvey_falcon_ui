import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class SquadsGateway{
    baseUrl: string;
  constructor(private http: HttpClient,
              private envService: EnvironmentService) {
      this.baseUrl = envService.getUrl(environment.api, environment.type);
      }

  getSquads(customerId): Observable<any> {
    return this.http.get(this.baseUrl + `squads?customerId=${customerId}`);
  }

  getSquad(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `squads/${customerId}`);
  }

  createSquad(model: any) {
    return this.http.post(this.baseUrl + 'squads', model);
  }

  updateSquad(id: string, model: any) {
    return this.http.put(this.baseUrl + 'squads/' + id, model);
  }

  deleteSquad(id: any) {
    return this.http.delete(this.baseUrl + 'squads/' + id);
  }
}
