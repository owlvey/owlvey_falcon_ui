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
}
