import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SquadService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  createSquad(model: any) {
    return this.http.post(this.baseUrl + "squads", model);
  }

  updateSquad(id: string, model: any) {
    return this.http.put(this.baseUrl + "squads/" + id, model);
  }

  deleteSquad(id: string) {
    return this.http.delete(this.baseUrl + "squads/" + id);
  }

  getSquads() {
    return this.http.get(this.baseUrl + "squads");
  }
}
