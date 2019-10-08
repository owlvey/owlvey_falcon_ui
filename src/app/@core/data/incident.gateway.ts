import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class IncidentsGateway{
    baseUrl: string;
    constructor(private http: HttpClient,
            private envService: EnvironmentService)
    {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
    }

    getIncidents(productId: number): Observable<any> {
        return this.http.get(this.baseUrl + `incidents?productId=${productId}`);
    }

    getIncident(incidentId: number): Observable<any> {
        return this.http.get(this.baseUrl + `incidents/${incidentId}`);
    }

    getIncidentComplement(incidentId: number): Observable<any> {
        return this.http.get(this.baseUrl + `incidents/${incidentId}/features/complement`);
    }

    postIncident(model: any): Observable<any>{
        return this.http.post(this.baseUrl + `incidents`, model);
    }
    putIncident(incidentId: number, model: any): Observable<any>{
        return this.http.put(this.baseUrl + `incidents/${incidentId}`, model);
    }
    registerFeature(incidentId: number, featureId: number): Observable<any>{
        return this.http.put(this.baseUrl + `incidents/${incidentId}/features/${featureId}`, {});
    }
    unRegisterFeature(incidentId: number, featureId: number): Observable<any>{
        return this.http.delete(this.baseUrl + `incidents/${incidentId}/features/${featureId}`);
    }
}
