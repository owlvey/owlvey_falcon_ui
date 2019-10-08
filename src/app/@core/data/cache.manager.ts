import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { map, publishReplay, refCount, windowTime, shareReplay, switchMap, startWith, takeUntil } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CacheManager {
    private reload = new Subject<void>();

    private state : any = {};

    constructor(){        
        interval(30000).pipe(startWith(0)).subscribe(_ => this.forceReload());
    }

    public getItem(key: string): Observable<any>{
        return this.state[key];
    }
    public addItem(key: string, target: Observable<any>){
        target = target.pipe(takeUntil(this.reload), shareReplay(1));
        this.state[key] = target;
    }

    public forceReload(){        
        this.reload.next();
        this.state = {};
    }   

}