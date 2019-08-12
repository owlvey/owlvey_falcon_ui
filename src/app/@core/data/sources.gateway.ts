import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourcesGateway{
    baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.api;
      }

    getSources(productId: number): Observable<any>{
        return this.http.get(this.baseUrl + `sources?productId=${productId}`);
    }

    getSource(sourceId: number): Observable<any> {
        return this.http.get(this.baseUrl + `sources/${sourceId}`);
    }

}