import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class FeatureService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  createFeature(model: any) {
    return this.http.post(this.baseUrl + "features", model);
  }

  updateFeature(id: string, model: any) {
    return this.http.put(this.baseUrl + "features/" + id, model);
  }

  deleteFeature(id: string) {
    return this.http.delete(this.baseUrl + "features/" + id);
  }

  getFeatures() {
    return this.http.get(this.baseUrl + "features");
  }
}
