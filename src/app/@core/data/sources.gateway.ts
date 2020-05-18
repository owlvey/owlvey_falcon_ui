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

    postAvailabilitySourceItemInteraction(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sources/availability/interaction/items`, model);
    }
    postAvailabilitySourceItemProportion(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sources/availability/proportion/items`, model);
    }

    postLatencySourceItem(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sources/latency/items`, model);
    }

    postExperienceSourceItemProportion(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sources/experience/proportion/items`, model);
    }

    postSourceItemProportion(model: any): Observable<any> {
        return this.owlveyGateway.post(this.baseUrl + `sourceItems/proportion`, model);
    }

    putAvailabilitySource(sourceId: number, model: any): Observable<any> {
        return this.owlveyGateway.put(this.baseUrl + `sources/availability/${sourceId}`, model);
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
    getSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getAvailabilityInteractionSourceWithAvailability(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/availability/${sourceId}/interaction?start=${start.toISOString()}&end=${end.toISOString()}`);
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
    

    getSourceItems(sourceId: number): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sourceItems?sourceId=${sourceId}`);
    }
    getSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sourceItems?sourceId=${sourceId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getInteractionSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sourceItems/interactions?sourceId=${sourceId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getAvailabilityInteractionSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sources/availability/${sourceId}/interaction/items?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
    getAvailabilityProportionSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sources/availability/${sourceId}/proportion/items?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getLatencySourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sources/latency/${sourceId}/items?start=${start.toISOString()}&end=${end.toISOString()}`);
    }

    getExperienceProportionSourceItemsByPeriod(sourceId: number, start: Date, end: Date): Observable<any>{
        return this.owlveyGateway.get(this.baseUrl + `sources/experience/${sourceId}/proportion/items?start=${start.toISOString()}&end=${end.toISOString()}`);
    }    

    getSourceItemById(sourceItemId: number) : Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sourceItems/${sourceItemId}`);
    }

    deleteSourceItem(sourceItemId: number): Observable<any>{
        return this.owlveyGateway.delete(this.baseUrl + `sourceItems/${sourceItemId}`);
    }

    getDaily(sourceId: number, start: Date, end: Date): Observable<any> {
        return this.owlveyGateway.get(this.baseUrl + `sources/${sourceId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
