import { Injectable } from "@angular/core";
import { of as observableOf, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable()
export class ProductsGateway {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getProducts(customerId: number): Observable<any> {
    return this.http.get(this.baseUrl + `products?customerId=${customerId}`);
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(this.baseUrl + `products/${productId}`);
  }

  getDaily(productId: number, start: Date, end: Date): Observable<any> {
    return this.http.get(
      this.baseUrl +
        `products/${productId}/reports/daily/series?start=${start.toISOString()}&end=${end.toISOString()}`
    );
  }
  getGraphView(productId: number, end: Date): Observable<any> {
    return this.http.get(this.baseUrl + `products/${productId}/reports/graph?end=${end.toISOString()}`);
  }

  createProduct(customerId: number, model: any) {
    model.customerId = customerId;
    return this.http.post(this.baseUrl + "products", model);
  }

  updateProduct(id: string, model: any) {
    return this.http.put(this.baseUrl + "products/" + id, model);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + "products/" + id);
  }
}
