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
    getPortfolio(portflioId: number): Observable<any>{
        return this.http.get(this.baseUrl + `services/${portflioId}`);
    }
}