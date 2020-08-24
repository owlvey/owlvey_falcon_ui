import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class RisksGateway {
  baseUrl: string;
  constructor(private http: HttpClient,
              private owlveyGateway : OwlveyGateway,
              private envService: EnvironmentService) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }

  getSecurityRisks(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security`);
  }

  getSecurityThreats(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats`);
  }
  getSecurityThreat(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats/${id}`);
  }
  deleteSecurityThreat(id: number): Observable<any> {
    return this.owlveyGateway.delete(this.baseUrl + `risks/security/threats/${id}`);
  }
  postSecurityThreat(name: string): Observable<any> {
    return this.owlveyGateway.post(this.baseUrl + `risks/security/threats`, {name: name});
  }
  putSecurityThreat(id: number, model: any): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `risks/security/threats/${id}`, model);
  }
  getReliabilityThreats(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats`);
  }
}
