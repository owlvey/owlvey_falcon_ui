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
  getSecurityThreats(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats`);
  }
  getReliabilityThreats(): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `risks/security/threats`);
  }
}