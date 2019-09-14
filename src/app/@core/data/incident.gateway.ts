import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
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
    
    getIncidents(productId: number, start: Date, end : Date) : Observable<any> {        
        return this.http.get(this.baseUrl + `incidents?productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`);
    }
}
