import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { FormatService } from '../../@core/utils/format.service';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { SourcesGateway } from '../../@core/data/sources.gateway';
import { ProductsGateway } from '../../@core/data/products.gateway';
import { CustomersGateway } from '../../@core/data/customers.gateway';

export abstract class BaseDetailSourceComponent {
    sourceId = 0;
    productId = 0;
    startDate: Date = new Date();
    endDate: Date;
    isRedirect : boolean = false;
    constructor(
        protected location: Location,
        protected customerGateway: CustomersGateway,
        protected productGateway: ProductsGateway,
        protected sourcesGateway: SourcesGateway,    
        protected toastr: NbToastrService,
        protected theme: NbThemeService, 
        protected format: FormatService,
        protected router: Router, 
        protected activatedRoute: ActivatedRoute) {       
            this.endDate = new Date();
            this.startDate = new Date();
            this.startDate.setDate(this.startDate.getDate() - 365);          
        }        

        protected baseOnInit(){
            this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
                this.productId = parseInt(paramMap.get('productId'));            
                this.sourceId = parseInt(paramMap.get('sourceId'));   
                this.startDate = new Date(paramMap.get('start'));
                this.endDate = new Date(paramMap.get('end'));      
                this.isRedirect = Boolean(paramMap.get('redirect'));
                this.getSource();
                this.getDaily();
            });          
        }

        abstract getSource() : void; 
        abstract getDaily(): void; 

        onBackClick($event){    
            if (this.isRedirect){
                window.history.go(-2);
            }
            else {
                this.location.back();
            }            
        }
        onDeleteClick(event){
            if (window.confirm('Are you sure you want to delete?')) {
              this.sourcesGateway.deleteSource(this.sourceId).subscribe(res=>{
                this.toastr.success("Source was deleted");
                let queryParams: Params = { sourceId : null };
                this.router.navigate(['/pages/sources'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
              }, (error) => {        
                this.toastr.warning("Something went wrong, please try again.", "Warning")
              });
              
            } else {
              event.confirm.reject();
            }
          }

}