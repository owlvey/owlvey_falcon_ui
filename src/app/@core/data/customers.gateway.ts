import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { map, publishReplay, refCount, windowTime, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { take } from 'rxjs-compat/operator/take';
import { timer } from 'rxjs/observable/timer';
import { CacheManager } from './cache.manager';

@Injectable()
export class CustomersGateway {
  baseUrl: string;  
  
  constructor(protected http: HttpClient,
              private cacheManager : CacheManager,
              private envService: EnvironmentService)
  {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }  

  getCustomers(): Observable<any> {        
    const key = `customers`;
    if(!this.cacheManager.getItem(key)){
      const target = this.http.get(this.baseUrl + 'customers');
      this.cacheManager.addItem(key, target);
    }
    return this.cacheManager.getItem(key);  
  }
  getCustomer(customerId: number): Observable<any> {        
    const key = `customers/${customerId}`;
    if(!this.cacheManager.getItem(key)){
      const target = this.http.get(this.baseUrl + key);
      this.cacheManager.addItem(key, target);
    }
    return this.cacheManager.getItem(key);     
  }
  getSquadsGraph(customerId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `customers/${customerId}/squads/reports/graph?start=${start.toISOString()}&end=${end.toISOString()}`);
  } 

  getCustomerWithAvailability(customerId: number, start: Date, end: Date): Observable<any> {
    const key = `customers/${customerId}?start=${start.toISOString()}&end=${end.toISOString()}`;
    if (!this.cacheManager.getItem(key)){
       const target = this.http.get(this.baseUrl + key);
       this.cacheManager.addItem(key, target);
    }
    return this.cacheManager.getItem(key);    
  }

  createCustomer(model: any) {
    this.cacheManager.forceReload();
    return this.http.post(this.baseUrl + 'customers', model);
  }

  updateCustomer(id: string, model: any) {
    return this.http.put(this.baseUrl + 'customers/' + id, model);
  }
  deleteCustomer(id: any) {
    this.cacheManager.forceReload();
    return this.http.delete(this.baseUrl + 'customers/' + id);
  }  

  importMetadata(customerId, model: any): Observable<any>{
    return this.http.post(this.baseUrl + `migrations/${customerId}/import/metadata/excel`, model);
  }
  exportMetadata(customerId: number): Observable<any>{
    return this.http.get(this.baseUrl + `migrations/${customerId}/export/metadata/excel`, { responseType: 'blob'});
  }
  exportData(customerId: number): Observable<any>{
    return this.http.get(this.baseUrl + `migrations/${customerId}/export/data/excel`, { responseType: 'blob'});
  }
}
