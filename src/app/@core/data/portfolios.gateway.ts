import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class PortfoliosGateway{
    baseUrl: string;
  constructor(private http: HttpClient,
              private envService: EnvironmentService)
      {
        this.baseUrl = envService.getUrl(environment.api, environment.type);
      }

    putPortfolio(portflioId: number, model: any): Observable<any>{
        return this.http.put(this.baseUrl + `services/${portflioId}`, model);
    }

    unRegisterFeature(portfolioId: number, featureId: number): Observable<any>{
        return this.http.delete(this.baseUrl + `serviceMaps?serviceId=${portfolioId}&featureId=${featureId}`);        
    }
    registerFeature(portfolioId: number, featureId: number){
        return this.http.post(this.baseUrl + `serviceMaps`, {
            serviceId: portfolioId,
            featureId: featureId
        });
    }

    getPortfolios(productId: number): Observable<any>{
        return this.http.get(this.baseUrl + `services?productId=${productId}`);
    }    
    getPortfoliosWithAvailabilities(productId: number, start: Date, end: Date): Observable<any>{
        return this.http.get(this.baseUrl + `services?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getPortfolio(portflioId: number): Observable<any>{
        return this.http.get(this.baseUrl + `services/${portflioId}`);
    }
    getPortfolioWithAvailabilities(portflioId: number, start: Date, end : Date): Observable<any>{
        return this.http.get(this.baseUrl + `services/${portflioId}?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getDaily(portfolioId: number, start: Date, end: Date): Observable<any> {
        return this.http.get(this.baseUrl + `services/${portfolioId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
