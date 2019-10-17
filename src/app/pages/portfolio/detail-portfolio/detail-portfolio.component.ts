import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';


@Component({
  selector: 'app-detail-portfolio',
  templateUrl: './detail-portfolio.component.html',
  styleUrls: ['./detail-portfolio.component.scss']
})
export class DetailPortfolioComponent implements OnInit, AfterViewInit {
  

  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentSource : any= {};    
  productId = 0;
  portfolioId = 0;
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];
  startDate: Date = new Date();
  endDate: Date;  
  source: LocalDataSource = new LocalDataSource();

  settings = {    
    mode: 'external',
    actions:{
      columnTitle:'Delete',
      width: '3em',
      position: 'right',
      add:false,
      edit:false,
      delete:false
    },    
    pager: {
      perPage: 20
    },
    columns: {            
      mapId: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },   
      id: {
        title: 'FeatureId',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },          
      name: {
        title: 'Name',
        type: 'string',
        filter: false,        
        editable: false
      },            
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
    },
  };
  /*
   mttd: {
        title: 'MTTD',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },          
      mtte: {
        title: 'MTTE',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },          
      mttf: {
        title: 'MTTF',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },                
  */
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private toastr: NbToastrService,
    private featuresGateway: FeaturesGateway,    
    private portfolioGateway: PortfoliosGateway,    
    private theme: NbThemeService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) {       
      
    }        

  ngOnInit() {         
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.portfolioId = parseInt(paramMap.get('portfolioId'));   
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getPortfolio();
      this.getDaily(); 
    });          
  }  

  getPortfolio(){    
    this.portfolioGateway.getPortfolioWithAvailabilities(this.portfolioId, this.startDate, this.endDate).subscribe(data=>{
      this.currentSource = data;            
      this.source.load(this.currentSource.features);      
    });    
  }
  onFeaturesRowSelect(event){
      const featureId = event.data.id;
      let queryParams: Params = { featureId: featureId, portfolioId: null };      
      this.router.navigate(['/pages/features/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  } 
  getDaily(){
    this.portfolioGateway.getDaily(this.portfolioId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
    });
  }
  onReportClick(event){
    this.getDaily(); 
  }

  onEditClick(event){      
      let queryParams: Params = { };      
      this.router.navigate(['/pages/portfolios/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onDelete(event){        
    const featureId =  event.data.id;    
    this.portfolioGateway.unRegisterFeature(this.portfolioId, featureId).subscribe(data=>{
      this.getPortfolio();
    });
    
  } 
  onBackClick(event){    
    //let queryParams: Params = { portfolioId: null };
    //this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                 
    this.location.back();
  }
  ngAfterViewInit() {    
    
  }

  onDeleteClick(event){    
    this.portfolioGateway.deletePortfolio(this.portfolioId).subscribe(res=>{
      this.toastr.success("Portfolio was deleted");
      let queryParams: Params = { portfolioId : null };
      this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
    }, (error) => {
      this.isLoading = false;
      this.toastr.warning("Something went wrong, please try again.", "Warning")
    });      
    
  }
}