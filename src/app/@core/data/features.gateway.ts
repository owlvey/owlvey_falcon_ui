import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class FeaturesGateway {
  baseUrl: string;
  constructor(
    private owlveyGateway : OwlveyGateway,
    private envService: EnvironmentService,
  ) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }

  getFeatures(productId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `features?productId=${productId}`);
  }

  getFeaturesUnregistered(portfolioId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `services/${portfolioId}/features/complement`);
  }

  getIndicatorsComplement(featureId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `features/${featureId}/indicators/complement`);
  }
  getSquadsComplement(featureId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `features/${featureId}/squads/complement`);
  }

  putSquad(featureId: number, squadId: number): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `features/${featureId}/squads/${squadId}`, {
      featureId : featureId,
      squadId : squadId,
    });
  }

  deleteSquad(featureId: number, squadId: number): Observable<any> {
    return this.owlveyGateway.delete(this.baseUrl + `features/${featureId}/squads/${squadId}`);
  }

  putIndicator(featureId: number, sourceId: number): Observable<any> {
    return this.owlveyGateway.put(this.baseUrl + `features/${featureId}/indicators/${sourceId}`, { });
  }
  deleteIndicator(featureId: number, sourceId: number){
    return this.owlveyGateway.delete(this.baseUrl + `features/${featureId}/indicators/${sourceId}`);
  }

  getFeaturesWithAvailabilities(productId: number, start: Date, end: Date): Observable<any> {
    return this.owlveyGateway.get(
      this.baseUrl + `features?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`,
    );
  }
  getFeature(featureId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `features/${featureId}`);
  }
  getFeatureWithQuality(featureId: number, start: Date,  end: Date): Observable<any> {
    return this.owlveyGateway.get(
      this.baseUrl + `features/${featureId}?start=${start.toISOString()}&end=${end.toISOString()}`,
    );
  }
  getDaily(featureId: number, start: Date, end: Date): Observable<any> {
    return this.owlveyGateway.get(
      this.baseUrl +
        `features/${featureId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`,
    );
  }
  createFeature(productId: number, model: any) {
    model.productId = productId;
    return this.owlveyGateway.post(`${this.baseUrl}features`, model);
  }
  deleteFeature(featureId: number): Observable<any>{
    return this.owlveyGateway.delete(`${this.baseUrl}features/${featureId}`);
  }
  updateFeature(featureId: number, model: any) {
    return this.owlveyGateway.put(`${this.baseUrl}features/${featureId}`, model);
  }
}
