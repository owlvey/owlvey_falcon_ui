import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class FeaturesGateway{
    baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.api;
      }

    getFeatures(productId: number): Observable<any>{
        return this.http.get(this.baseUrl + `features?productId=${productId}`);
    }
    getFeaturesWithAvailabilities(productId: number, end: Date): Observable<any>{
        return this.http.get(this.baseUrl + `features?productId=${productId}&end=${end.toISOString()}`);
    }
    getFeature(featureId: number): Observable<any>{
        return this.http.get(this.baseUrl + `features/${featureId}`);
    }
    getFeatureWithAvailabilities(featureId: number, end: Date): Observable<any>{
        return this.http.get(this.baseUrl + `features/${featureId}?&end=${end.toISOString()}`);
    }
    getDaily(featureId: number, start: Date, end: Date): Observable<any> {
        return this.http.get(this.baseUrl + `features/${featureId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}