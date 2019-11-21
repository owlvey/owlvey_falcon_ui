import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { map, publishReplay, refCount, windowTime, shareReplay, switchMap, startWith, takeUntil } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../utils/env.service';
import { environment } from './../../../environments/environment';


@Injectable()
export class CacheManager {
    private reload = new Subject<void>();
    private baseUrl: string;  
    private state : any = {};
    private lastUpdate : string = "original";

    constructor(protected http: HttpClient, private envService: EnvironmentService){        
        this.baseUrl = envService.getUrl(environment.api, environment.type);
        interval(20000).pipe(startWith(0)).subscribe(_ => this.checkCache());
    }    

    public getItem(key: string): Observable<any>{
        return this.state[key];
    }
    public addItem(key: string, target: Observable<any>){
        target = target.pipe(takeUntil(this.reload), shareReplay(1));
        this.state[key] = target;
    }

    public checkCache(){
        this.http.get(this.baseUrl + `cache/last`).subscribe((data: any) =>{                        
            if ( data.modified != this.lastUpdate){
                console.log("last update: " + this.lastUpdate);
                console.log("data modified: " + data.modified);            
                console.log("update cache.....");
                this.lastUpdate = data.modified;
                this.forceReload();                
            }
        });
    }

    public forceReload(){            
        this.reload.next();
        this.state = {};
    }   
}