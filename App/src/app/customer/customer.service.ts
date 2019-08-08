import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.api;
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

  getCustomers() {
    return this.http.get(this.baseUrl + 'customers');
  }
}
