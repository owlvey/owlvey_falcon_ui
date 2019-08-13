import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  createProduct(model: any) {
    return this.http.post(this.baseUrl + "products", model);
  }

  updateProduct(id: string, model: any) {
    return this.http.put(this.baseUrl + "products/" + id, model);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + "products/" + id);
  }

  getProducts(customerId: number) {
    return this.http.get(this.baseUrl + "products");
  }
}
