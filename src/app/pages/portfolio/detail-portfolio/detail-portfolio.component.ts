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
      sequence: {
        title: 'IX',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },   
      id: {
        title: 'Id',
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
      total: {
        title: 'Total',
        type: 'number',
        filter: false,
        width: '5em',
        editable: false,        
      },            
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
      featureSlo: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
      budget: {
        title: 'Budget',
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
      const features = this.currentSource.features.map(c=>{                
        return c;        
      });

      this.source.load(features);      
    });    
  }  
  getDaily(){
    this.portfolioGateway.getDaily(this.portfolioId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
    });  
  }

  squadSource: LocalDataSource = new LocalDataSource();
  indicatorSource : LocalDataSource = new LocalDataSource();
  squadsSettings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 5
    },
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      }      
    }
  };

  indicatorSettings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 10
    },
    columns: {      
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        sort:true,
        width: '3em',
        sortDirection: 'asc'     
      },
      source: {
        title: 'SLI',
        type: 'string',
        filter: false
      },
      total: {
        title: 'Total',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },  
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },           
      indicatorSlo: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
      budget: {
        title: 'Budget',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
    },
  };
  currentFeature : any;
  onFeaturesRowSelect(event){
      
      this.currentFeature = event.data;
      const featureId = event.data.id;
      const slo = event.data.featureSlo;
      this.featuresGateway.getFeatureWithAvailabilities(featureId, this.startDate, this.endDate).subscribe(feature=>{        
        const temporal = feature.indicators;
        const indicators = temporal.map(c=>{
          c.indicatorSlo = Math.round(Math.pow(slo, 1/temporal.length) * 10000) /10000;
          c.budget =  Math.round( (c.availability - c.indicatorSlo) * 10000) /10000;
          return c;
        });

        this.indicatorSource.load(indicators);
        this.squadSource.load(feature.squads);                
      });  
  } 
  onReportClick(event){
    this.getDaily(); 
  }

  onEditClick(event){      
      let queryParams: Params = { };      
      this.router.navigate(['/pages/portfolios/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onDeleteClick(event){        
    this.portfolioGateway.deletePortfolio(this.portfolioId).subscribe(data=>{
      this.toastr.success("Portfolio was deleted");
      let queryParams: Params = { portfolioId : null };
      this.router.navigate(['/pages/portfolios'], {         
        queryParams: queryParams, 
        queryParamsHandling: 'merge' });     

    }, (error) => {      
      this.toastr.warning("Something went wrong, please try again.", "Warning")
    });   
    
  } 
  onBackClick(event){    
    //let queryParams: Params = { portfolioId: null };
    //this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                 
    this.location.back();
  }
  ngAfterViewInit() {    
    
  }

  onIndicatorsRowSelect(event){
    const sourceId = event.data.sourceId;
    let queryParams: Params = { sourceId: sourceId };
    this.router.navigate(['/pages/sources/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onSquadRowSelect(event){
    const squadId = event.data.id;
    let queryParams: Params = { squadId: squadId };
    this.router.navigate(['/pages/squads/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
}