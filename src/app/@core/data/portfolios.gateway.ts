import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class JourneysGateway{
    baseUrl: string;
  constructor(private http: HttpClient,
              private owlveyGateway : OwlveyGateway,
              private envService: EnvironmentService)
    {
        this.baseUrl = envService.getUrl(environment.api, environment.type);
    }

    postPortfolio(model: any){
        return this.owlveyGateway.post(this.baseUrl + `journeys`, model);
    }

    deletePortfolio(portfolioId: number){
        return this.owlveyGateway.delete(this.baseUrl + `journeys/${portfolioId}`);
    }

    putPortfolio(portflioId: number, model: any): Observable<any>{
        return this.owlveyGateway.put(this.baseUrl + `journeys/${portflioId}`, model);
    }

    unRegisterFeature(portfolioId: number, featureId: number): Observable<any>{
        return this.owlveyGateway.delete(this.baseUrl + `journeys/${portfolioId}/features/${featureId}`);
    }
    registerFeature(portfolioId: number, featureId: number){
        return this.owlveyGateway.put(this.baseUrl + `journeys/${portfolioId}/features/${featureId}`, {});
    }

    getPortfoliosGroup(productId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys/journeyGroup?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getPortfoliosGroupAnnual(productId: number, start: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys/reports/journeyGroup/annual?productId=${productId}&start=${start.toISOString()}`);
    }
    getPortfoliosAnnual(productId: number, start: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys/reports/annual?productId=${productId}&start=${start.toISOString()}`);
    }
    getPortfoliosGroupAnnualCalendar(productId: number, group: string, start: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys/reports/journeyGroup/annual/calendar?productId=${productId}&group=${group}&start=${start.toISOString()}`);
    }

    getServicesDailyReport(productId: number, start: Date, end: Date, group?: String): Observable<any> {
        group = group && group || "";
        return this.owlveyGateway.get(
          this.baseUrl +
            `journeys/reports/debt/daily/series?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}&group=${group}`,
        );
      }

    getPortfolios(productId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys?productId=${productId}`);
    }
    getPortfoliosWithAvailabilities(productId: number, start: Date, end: Date, group? : string): Observable<any>{
        group = group && group || "";
        return this.owlveyGateway.get(this.baseUrl + `journeys?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}&group=${group}`);
    }
    getPortfolio(portflioId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys/${portflioId}`);
    }
    getPortfolioGraph(portfolioId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `journeys/${portfolioId}/reports/graph?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getPortfolioWithAvailabilities(portflioId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `journeys/${portflioId}?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getDaily(portfolioId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `journeys/${portfolioId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
