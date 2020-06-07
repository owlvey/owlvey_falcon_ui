import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { OwlveyGateway } from './owlvey.gateway';

@Injectable()
export class ProductsGateway {
  baseUrl: string;
  constructor(private http: HttpClient,
              private owlveyGateway : OwlveyGateway,
              private envService: EnvironmentService) {
    this.baseUrl = envService.getUrl(environment.api, environment.type);
  }

  getProducts(customerId: number, start: Date, end: Date): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `products?customerId=${customerId}&start=${start.toISOString()}&end=${end.toISOString()}`);
  }
  getProductsLite(customerId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `products/lite?customerId=${customerId}`);
  }
  getProduct(productId: number): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `products/${productId}`);
  }  

  getGraphView(productId: number, start: Date, end: Date): Observable<any> {
    return this.owlveyGateway.get(this.baseUrl + `products/${productId}/reports/graph?start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  createProduct(customerId: number, model: any) {
    model.customerId = customerId;
    return this.owlveyGateway.post(this.baseUrl + 'products', model);
  }

  updateProduct(id: number, model: any) {
    return this.owlveyGateway.put(this.baseUrl + `products/${id}`, model);
  }

  deleteProduct(id: number) {
    return this.owlveyGateway.delete(this.baseUrl + 'products/' + id);
  }

  getProductDashboard(productId: number, start: Date, end: Date): Observable<any>{
    return this.owlveyGateway.get(this.baseUrl + `products/${productId}/dashboard?start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  getProductServiceGroupDashboard(productId: number, start: Date, end: Date): Observable<any>{
    return this.owlveyGateway.get(this.baseUrl + `products/${productId}/dashboard/services/groups?start=${start.toISOString()}&end=${end.toISOString()}`);
  }  

  
  //#region Syncs

  getSyncs(productId: number) : Observable<any> {
    return this.http.get(this.baseUrl +  `products/${productId}/sync`);
  }

  getSync(productId: number, name: string) : Observable<any> {
    return this.http.get(this.baseUrl +  `products/${productId}/sync/${name}`);
  }
  postSync(productId: number, name: string): Observable<any> {
    return this.http.post(this.baseUrl +  `products/${productId}/sync/${name}`, {});
  }
  putSync(productId: number, name: string, model: any): Observable<any> {
    return this.http.put(this.baseUrl +  `products/${productId}/sync/${name}`, model);
  }
  deleteSync(productId: number, name: string): Observable<any> {
    return this.http.delete(this.baseUrl +  `products/${productId}/sync/${name}`);
  }  
  exportToExcel(productId: number, start: Date, end: Date): Observable<any>{
    return this.http.get(this.baseUrl + `products/${productId}/reports/excel?start=${start.toISOString()}&end=${end.toISOString()}`,
       { responseType: 'blob'});
  }

  exportAvailabilityInteractionsToExcel(productId: number): Observable<any>{
    return this.http.get(this.baseUrl + `products/${productId}/exports/availability/interactions`,
       { responseType: 'blob'});
  }
  exportItems(productId: number, start: Date, end: Date): Observable<any>{
    return this.http.get(this.baseUrl + `products/${productId}/exports/items?start=${start.toISOString()}&end=${end.toISOString()}`,
       { responseType: 'blob'});
  }

  importsItems(productId: number, model: any): Observable<any>{
    return this.http.post(this.baseUrl + `products/${productId}/imports/items`, model);        
  } 

  //#endregion
}
