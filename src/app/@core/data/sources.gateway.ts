import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from '../../../environments/environment';
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class SourcesGateway{
    baseUrl: string;
  constructor(private owlveyGateway : OwlveyGateway,
              private envService: EnvironmentService) {
        this.baseUrl = envService.getUrl(environment.api, environment.type);
    }

    getSources(productId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sources?productId=${productId}`);
    }

    getSourcesWithAvailability(productId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sources?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    postSource(productId: number, name: String, kind: string, group: string): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sources`, 
        { 
            productId: productId,
            name: name,
            kind: kind,
            group: group
        });
    }

    deleteSource(sourceId: number): Observable<any> {
        return this.owlveyGateway.delete(this.baseUrl + `sources/${sourceId}`);
    }

    postSourceItem(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sourceItems`, model);
    }
    postSourceItemPercent(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sourceItems/percent`, model);
    }

    putSource(sourceId: number, model: any): Observable<any> {
        return this.owlveyGateway.put(this.baseUrl + `sources/${sourceId}`, model);
    }
    getSource(sourceId: number): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}`);
    }
    getSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getSourceItems(sourceId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sourceItems?sourceId=${sourceId}`);
    }
    getSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sourceItems?sourceId=${sourceId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    deleteSourceItem(sourceItemId: number): Observable<any>{
        return this.owlveyGateway.delete(this.baseUrl + `sourceItems/${sourceItemId}`);
    }

    getDaily(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
