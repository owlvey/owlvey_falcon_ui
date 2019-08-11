import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PortfolioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  createPortfolio(model: any) {
    return this.http.post(this.baseUrl + "services", model);
  }

  updatePortfolio(id: string, model: any) {
    return this.http.put(this.baseUrl + "services/" + id, model);
  }

  deletePortfolio(id: string) {
    return this.http.delete(this.baseUrl + "services/" + id);
  }

  getPortfolios(productId) {
    return this.http.get(this.baseUrl + "services?productId=" + productId);
  }
}
