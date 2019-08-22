import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class PortfoliosGateway{
    baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.api;
      }

    getPortfolios(productId: number): Observable<any>{
        return this.http.get(this.baseUrl + `services?productId=${productId}`);
    }    
    getPortfoliosWithAvailabilities(productId: number, end: Date): Observable<any>{
        return this.http.get(this.baseUrl + `services?productId=${productId}&end=${end.toISOString()}`);
    }
    getPortfolio(portflioId: number): Observable<any>{
        return this.http.get(this.baseUrl + `services/${portflioId}`);
    }
    getPortfolioWithAvailabilities(portflioId: number, end : Date): Observable<any>{
        return this.http.get(this.baseUrl + `services/${portflioId}?end=${end.toISOString()}`);
    }
    getDaily(portfolioId: number, start: Date, end: Date): Observable<any> {
        return this.http.get(this.baseUrl + `services/${portfolioId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}