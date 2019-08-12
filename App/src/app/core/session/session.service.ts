import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl: string;
  constructor() {
    
  }
  get customer(){
     return JSON.parse(sessionStorage.getItem("customer"));
  }
  set customer(customer: object){
     sessionStorage.setItem("customer", JSON.stringify(customer));
  }  
}
