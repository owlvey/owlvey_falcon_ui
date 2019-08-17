import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class CustomersGateway {
  baseUrl: string;
  constructor(protected http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.baseUrl + 'customers');
  }

  getCustomer(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `customers/${customerId}`);
  }

  createCustomer(model: any) {
    return this.http.post(this.baseUrl + 'customers', model);
  }

  updateCustomer(id: string, model: any) {
    return this.http.put(this.baseUrl + 'customers/' + id, model);
  }

  deleteCustomer(id: string) {
    return this.http.delete(this.baseUrl + 'customers/' + id);
  }
}
