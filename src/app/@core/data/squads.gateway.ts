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
  getSquadsWithPoints(customerId, start: Date, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `squads?customerId=${customerId}&start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  getSquad(squadId: number): Observable<any> {
    return this.http.get(this.baseUrl + `squads/${squadId}`);
  }  
  getSquadDetail(squadId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `squads/${squadId}?start=${start.toISOString()}&end=${end.toISOString()}`);
  }  
  
  createSquad(model: any) {
    return this.http.post(this.baseUrl + 'squads', model);
  }

  createSquadProduct(model: any) {
    return this.http.post(this.baseUrl + 'squadProducts', model);
  }

  updateSquad(id: string, model: any) {
    return this.http.put(this.baseUrl + 'squads/' + id, model);
  }

  registerMember(squadId: number, userId: number) : Observable<any>{
    return this.http.put(this.baseUrl + `squads/${squadId}/members/${userId}`, {});
  }
  unRegisterMember(squadId: number, userId: number): Observable<any>{
    return this.http.delete(this.baseUrl + `squads/${squadId}/members/${userId}`);
  }

  deleteSquad(id: any) {
    return this.http.delete(this.baseUrl + 'squads/' + id);
  }

  getMembersComplement(squadId: any) : Observable<any> {
    return this.http.get(this.baseUrl + `squads/${squadId}/members/complement`);
  }
}
