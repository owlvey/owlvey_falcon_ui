import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class CustomerEventHub {
    public event: Subject<any> = new Subject<any>();

    public customerCreated: Subject<any> = new Subject<any>();
  
    constructor() { 
        
    }

}