import { Injectable } from "@angular/core";
import { of as observableOf, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EnvironmentService } from "../utils/env.service";
import { environment } from "./../../../environments/environment";

@Injectable()
export class FeaturesGateway {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }

  getFeatures(productId: number): Observable<any> {
    return this.http.get(this.baseUrl + `features?productId=${productId}`);
  }

  getFeaturesUnregistered(portfolioId: number) : Observable<any> {
    return this.http.get(this.baseUrl + `services/${portfolioId}/features/complement`)    
  }

  getIndicatorsComplement(featureId: number): Observable<any> {
    return this.http.get(this.baseUrl + `features/${featureId}/indicators/complement`);
  }
  getSquadsComplement(featureId: number): Observable<any> {
    return this.http.get(this.baseUrl + `features/${featureId}/squads/complement`);
  }

  putSquad(featureId: number, squadId: number): Observable<any> {
    return this.http.put(this.baseUrl + `features/${featureId}/squads/${squadId}`, {
      featureId : featureId, 
      squadId : squadId
    });
  }

  deleteSquad(featureId: number, squadId: number): Observable<any> {
    return this.http.delete(this.baseUrl + `features/${featureId}/squads/${squadId}`);
  } 

  postIndicator(featureId: number, sourceId: number): Observable<any> {
    return this.http.post(this.baseUrl + `indicators`, {
      featureId : featureId, 
      sourceId : sourceId
    });
  }
  deleteIndicator(indicatorId: number){
    return this.http.delete(this.baseUrl + `indicators/${indicatorId}`);
  }

  getFeaturesWithAvailabilities(productId: number, start:Date, end: Date): Observable<any> {
    return this.http.get(
      this.baseUrl + `features?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`
    );
  }
  getFeature(featureId: number): Observable<any> {
    return this.http.get(this.baseUrl + `features/${featureId}`);
  }
  getFeatureWithAvailabilities(featureId: number, start:Date,  end: Date): Observable<any> {
    return this.http.get(
      this.baseUrl + `features/${featureId}?start=${start.toISOString()}&end=${end.toISOString()}`
    );
  }
  getDaily(featureId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(
      this.baseUrl +
        `features/${featureId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`
    );
  }
  createFeature(productId: number, model: any) {
    model.productId = productId;
    return this.http.post(`${this.baseUrl}features`, model);
  }
  deleteFeature(featureId: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}features/${featureId}`);
  }
  updateFeature(featureId: number, model: any) {
    return this.http.put(`${this.baseUrl}features/${featureId}`, model);
  }
}
