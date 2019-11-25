import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { map, publishReplay, refCount, windowTime, shareReplay, switchMap, startWith, takeUntil } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';
import { CacheManager } from './cache.manager';
import { share } from 'rxjs/operators';
import "rxjs/add/operator/share";

@Injectable()
export class OwlveyGateway {
    baseUrl: string;
    constructor(private http: HttpClient, private envService: EnvironmentService,
        private cacheManager: CacheManager){        
    }

    put(url: string, body: any | null): Observable<Object> {        
        this.cacheManager.forceReload();
        let result = this.http.put(url, body).share();                
        return result;
    }


    delete(url: string): Observable<Object> {        
        const result = this.http.delete(url).share();
        result.subscribe(_ =>{}, _=>{}, ()=>{
            this.cacheManager.forceReload();
        });                
        return result;
    }

    post(url: string, body: any | null): Observable<Object>{        
        this.cacheManager.forceReload();
        const result = this.http.post(url, body).share();                        
        return result;
    }

    get(url: string): Observable<Object>{        
        let result = this.cacheManager.getItem(url);
        if (!result){
            result = this.http.get(url).share();                   
            this.cacheManager.addItem(url, result);            
        }
        return result;       
    }
}