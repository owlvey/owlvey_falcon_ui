import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class CustomersGateway {
  baseUrl: string;
  constructor(protected http: HttpClient,
              private envService: EnvironmentService)
  {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.baseUrl + 'customers');
  }

  getCustomer(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `customers/${customerId}`);
  }  

  getSquadsGraph(customerId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `customers/${customerId}/squads/reports/graph?start=${start.toISOString()}&end=${end.toISOString()}`);
  }  

  getCustomerWithAvailability(customerId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `customers/${customerId}?start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  createCustomer(model: any) {
    return this.http.post(this.baseUrl + 'customers', model);
  }

  updateCustomer(id: string, model: any) {
    return this.http.put(this.baseUrl + 'customers/' + id, model);
  }

  deleteCustomer(id: any) {
    return this.http.delete(this.baseUrl + 'customers/' + id);
  }
  getDaily(customerId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `customers/${customerId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  importMetadata(customerId, model: any): Observable<any>{
    return this.http.post(this.baseUrl + `customers/${customerId}/import/metadata/excel`, model);
  }

  exportMetadata(customerId: number): Observable<any>{    
    return this.http.get(this.baseUrl + `customers/${customerId}/export/metadata/excel`, { responseType: 'blob'});
  }
}
