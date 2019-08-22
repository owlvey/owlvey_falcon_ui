import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourcesGateway{
    baseUrl: string;
  constructor(private http: HttpClient,
              private envService: EnvironmentService) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
      }

    getSources(productId: number): Observable<any>{
        return this.http.get(this.baseUrl + `sources?productId=${productId}`);
    }

    getSourcesWithAvailability(productId: number, end: Date): Observable<any>{
        return this.http.get(this.baseUrl + `sources?productId=${productId}&&end=${end.toISOString()}`);
    }

    postSource(productId: number, name: String): Observable<any> {
        return this.http.post(this.baseUrl + `sources`, { productId:productId , name: name});        
    }
    putSource(sourceId: number, model: any): Observable<any> {
        return this.http.put(this.baseUrl + `sources/${sourceId}`, model);        
    }
    getSource(sourceId: number): Observable<any> {
        return this.http.get(this.baseUrl + `sources/${sourceId}`);
    }
    getSourceWithAvailability(sourceId: number, end: Date): Observable<any> {
        return this.http.get(this.baseUrl + `sources/${sourceId}?end=${end.toISOString()}`);
    }

    getSourceItems(sourceId: number): Observable<any>{
        return this.http.get(this.baseUrl + `sourceItems?sourceId=${sourceId}`);
    }

    getDaily(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.http.get(this.baseUrl + `sources/${sourceId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
