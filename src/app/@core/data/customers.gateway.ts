import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { map, publishReplay, refCount, windowTime, shareReplay, switchMap, takeUntil, timeout } from 'rxjs/operators';
import { take } from 'rxjs-compat/operator/take';
import { timer } from 'rxjs/observable/timer';
import { CacheManager } from './cache.manager';
import { OwlveyGateway } from './owlvey.gateway';
import { CustomerEventHub } from '../hubs/customer.eventhub';

@Injectable()
export class CustomersGateway {
  baseUrl: string;

  constructor(protected http: HttpClient,
              private cacheManager : CacheManager,
              private owlveyGateway : OwlveyGateway,
              private customerEventHub: CustomerEventHub,
              private envService : EnvironmentService)
  {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }

  getCustomers(): Observable<any> {
    const result = this.owlveyGateway.get(this.baseUrl + 'customers/lite');
    return result;
  }
  getCustomersWithQuality(start: Date, end: Date): Observable<any> {
    const result = this.owlveyGateway.get(this.baseUrl + `customers?start=${start.toISOString()}&end=${end.toISOString()}`);
    return result;
  }
  getCustomer(customerId: number): Observable<any> {
    const key = `customers/${customerId}`;
    return this.owlveyGateway.get(this.baseUrl + key);
  }
  getSquadsGraph(customerId: number, start: Date, end: Date): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `customers/${customerId}/squads/reports/graph?start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  getCustomerWithAvailability(customerId: number, start: Date, end: Date): Observable<any> {
    const key = `customers/${customerId}/quality?start=${start.toISOString()}&end=${end.toISOString()}`;
    return this.owlveyGateway.get(this.baseUrl + key);
  }

  createCustomer(model: any) {
    const result = this.owlveyGateway.post(this.baseUrl + 'customers', model);
    result.subscribe(data=>{
      this.customerEventHub.customerUpdated.next({ name: 'reloadCustomers' });
    });
    return result;
  }

  updateCustomer(id: string, model: any) {
    return this.owlveyGateway.put(this.baseUrl + 'customers/' + id, model);
  }
  deleteCustomer(id: any) {
    var result = this.owlveyGateway.delete(this.baseUrl + 'customers/' + id);
    result.subscribe(data=>{
      this.customerEventHub.customerUpdated.next({ name: 'reloadCustomers' });
    });
    return result;
  }


  restore(model: any): Observable<any>{
    return this.http.post(this.baseUrl + `migrations/restore`, model);
  }
  backupMetadata(): Observable<any>{
    return this.http.get(this.baseUrl + `migrations/backup/metadata`, { responseType: 'blob'});
  }
  backupData(): Observable<any>{
    return this.http.get(this.baseUrl + `migrations/backup/data`, { responseType: 'blob'});
  }

  getCustomerDashboard(start: Date, end: Date): Observable<any> {
    const key = `customers/dashboard/products/journeys?start=${start.toISOString()}&end=${end.toISOString()}`;
    return this.owlveyGateway.get(this.baseUrl + key);
  }

}
