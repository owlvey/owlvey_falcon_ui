import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SourceService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  createFeature(model: any) {
    return this.http.post(this.baseUrl + "services", model);
  }

  updateFeature(id: string, model: any) {
    return this.http.put(this.baseUrl + "services/" + id, model);
  }

  deleteFeature(id: string) {
    return this.http.delete(this.baseUrl + "services/" + id);
  }

  getFeatures() {
    return this.http.get(this.baseUrl + "services");
  }
  getSources(customerId: number){
    return this.http.get(this.baseUrl + "sources?customerId=" + customerId)
  }
}
