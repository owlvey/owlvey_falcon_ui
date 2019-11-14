import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { OnInit } from '@angular/core';

export abstract class BaseComponent implements OnInit {    
    
    public startDate : Date; 
    public endDate: Date;
    public isLoading: boolean;
    
    constructor(
        protected location: Location,
        protected theme: NbThemeService,
        protected router: Router, 
        protected activatedRoute: ActivatedRoute) {                 
    }        

    abstract onChangeQueryParameters(paramMap: ParamMap): void;
    abstract onNgOnInit(): void;
    
    ngOnInit(): void {        
        this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                      
            this.startDate = new Date(paramMap.get('start'));
            this.endDate = new Date(paramMap.get('end'));                  
            this.onChangeQueryParameters(paramMap);
          });          
        this.onNgOnInit();
    }   
    
    protected goHome(){
        let queryParams: Params = {             
            productId: null, 
            customerId: null };
        this.router.navigate(['/pages/home'], { relativeTo: this.activatedRoute,
             queryParams: queryParams, 
             queryParamsHandling: 'merge' });                 
    }

    public onBackClick(event){                    
        this.location.back();
    }
}