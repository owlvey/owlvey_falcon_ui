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
  getReliabilityRisks(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/reliability`);
  }
  getSecurityRisksBySource(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security?sourceId=${id}`);
  }
  getReliabilityRisksBySource(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/reliability?sourceId=${id}`);
  }
  getSecurityRisk(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/${id}`);
  }
  getReliabilityRisk(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/reliability/${id}`);
  }

  getSecurityThreats(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats`);
  }
  getSecurityThreat(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats/${id}`);
  }
  getReliabilityThreat(id: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/reliability/threats/${id}`);
  }
  deleteSecurityThreat(id: number): Observable<any> {
    return this.owlveyGateway.delete(this.baseUrl + `risks/security/threats/${id}`);
  }
  deleteReliabilityThreat(id: number): Observable<any> {
    return this.owlveyGateway.delete(this.baseUrl + `risks/reliability/threats/${id}`);
  }
  deleteSecurityRisk(id: number): Observable<any> {
    return this.owlveyGateway.delete(this.baseUrl + `risks/security/${id}`);
  }
  deleteReliabilityRisk(id: number): Observable<any> {
    return this.owlveyGateway.delete(this.baseUrl + `risks/reliability/${id}`);
  }
  postReliabilityThreat(name: string): Observable<any> {
    return this.owlveyGateway.post(this.baseUrl + `risks/reliability/threats`, {name: name});
  }
  postSecurityThreat(name: string): Observable<any> {
    return this.owlveyGateway.post(this.baseUrl + `risks/security/threats`, {name: name});
  }
  postSecurityRisk(model: any): Observable<any> {
      return this.owlveyGateway.post(this.baseUrl + `risks/security`, model);
  }
  postReliabilityRisk(model: any): Observable<any> {
    return this.owlveyGateway.post(this.baseUrl + `risks/reliability`, model);
  }
  putSecurityThreat(id: number, model: any): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `risks/security/threats/${id}`, model);
  }
  putReliabilityThreat(id: number, model: any): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `risks/reliability/threats/${id}`, model);
  }
  putSecurityRisk(id: number, model: any): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `risks/security/${id}`, model);
  }
  putReliabilityRisk(id: number, model: any): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `risks/reliability/${id}`, model);
  }
  getReliabilityThreats(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/reliability/threats`);
  }
}
