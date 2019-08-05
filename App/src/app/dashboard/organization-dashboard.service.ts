import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationDashboardService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.api;
  }

  getStats() {
    return this.http.get(this.baseUrl + 'stats');
  }

}
