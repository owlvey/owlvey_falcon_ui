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

    postSource(productId: number, name: String): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sources`,
        {
            productId: productId,
            name: name
        });
    }

    deleteSource(sourceId: number): Observable<any> {
        return this.owlveyGateway.delete(this.baseUrl + `sources/${sourceId}`);
    }

    postAvailabilitySourceItem(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sourceItems/availability`, model);
    }

    postLatencySourceItem(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sourceItems/latency`, model);
    }

    postExperienceSourceItem(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sourceItems/experience`, model);
    }

    putSource(sourceId: number, model: any): Observable<any> {
        return this.owlveyGateway.put(this.baseUrl + `sources/${sourceId}`, model);
    }
    putExperienceSource(sourceId: number, model: any): Observable<any> {
        return this.owlveyGateway.put(this.baseUrl + `sources/experience/${sourceId}`, model);
    }
    putLatencySource(sourceId: number, model: any): Observable<any> {
        return this.owlveyGateway.put(this.baseUrl + `sources/latency/${sourceId}`, model);
    }
    getSource(sourceId: number): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}`);
    }
    getLatencySource(sourceId: number): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/latency/${sourceId}`);
    }

    getSourceWithDetail(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}/detail?start=${start.toISOString()}&end=${end.toISOString()}`);
    }


    getAvailabilityInteractionSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/availability/${sourceId}/interaction?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getAvailabilityInteractionSourceScalability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/availability/${sourceId}/interaction/scalability?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getAvailabilityProportionSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/availability/${sourceId}/proportion?start=${start.toISOString()}&end=${end.toISOString()}`);
    }


    getExperienceInteractionSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/experience/${sourceId}/interaction?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getExperienceProportionSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/experience/${sourceId}/proportion?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getLatencySourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/latency/${sourceId}?start=${start.toISOString()}&end=${end.toISOString()}`);
    }



    getAvailabilitySourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sourceItems/availability?sourceId=${sourceId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getLatencySourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
      return this.owlveyGateway.get(this.baseUrl + `sourceItems/latency?sourceId=${sourceId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getExperienceSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
      return this.owlveyGateway.get(this.baseUrl + `sourceItems/experience?sourceId=${sourceId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getSourceItemById(sourceItemId: number) : Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sourceItems/${sourceItemId}`);
    }

    deleteSourceItem(sourceItemId: number): Observable<any>{
        return this.owlveyGateway.delete(this.baseUrl + `sourceItems/${sourceItemId}`);
    }
    deleteAllSourceItem(sourceId: number): Observable<any>{
        return this.owlveyGateway.delete(this.baseUrl + `sourceItems?sourceId=${sourceId}`);
    }

    getDaily(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
