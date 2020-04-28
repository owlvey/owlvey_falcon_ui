import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class PortfoliosGateway{
    baseUrl: string;
  constructor(private http: HttpClient,
              private owlveyGateway : OwlveyGateway,
              private envService: EnvironmentService)
    {
        this.baseUrl = envService.getUrl(environment.api, environment.type);
    }

    postPortfolio(model: any){
        return this.owlveyGateway.post(this.baseUrl + `services`, model);
    }

    deletePortfolio(portfolioId: number){
        return this.owlveyGateway.delete(this.baseUrl + `services/${portfolioId}`);
    }

    putPortfolio(portflioId: number, model: any): Observable<any>{
        return this.owlveyGateway.put(this.baseUrl + `services/${portflioId}`, model);
    }

    unRegisterFeature(portfolioId: number, featureId: number): Observable<any>{
        return this.owlveyGateway.delete(this.baseUrl + `services/${portfolioId}/features/${featureId}`);
    }
    registerFeature(portfolioId: number, featureId: number){
        return this.owlveyGateway.put(this.baseUrl + `services/${portfolioId}/features/${featureId}`, {});        
    }

    getPortfoliosGroup(productId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `services/reports/serviceGroup?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getPortfolios(productId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `services?productId=${productId}`);
    }
    getPortfoliosWithAvailabilities(productId: number, start: Date, end: Date, group? : string): Observable<any>{
        group = group && group || "";
        return this.owlveyGateway.get(this.baseUrl + `services?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}&group=${group}`);
    }
    getPortfolio(portflioId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `services/${portflioId}`);
    }
    getPortfolioGraph(portfolioId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `services/${portfolioId}/reports/graph?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getPortfolioWithAvailabilities(portflioId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `services/${portflioId}?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getDaily(portfolioId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `services/${portfolioId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
