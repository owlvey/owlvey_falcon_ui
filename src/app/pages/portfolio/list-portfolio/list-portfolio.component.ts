import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { NbThemeService } from '@nebular/theme';
import { FormatService } from '../../../@core/utils/format.service';

@Component({
  selector: 'app-list-portfolio',
  templateUrl: './list-portfolio.component.html',
  styleUrls: ['./list-portfolio.component.scss']
})
export class ListPortfolioComponent implements OnInit {

  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentProduct: any;  
  productId = 0;
  customerId = 0;
  startDate: Date = new Date();
  endDate: Date;  

  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 1000
    },
    columns: {           
      availabilitySLO: {
        title: 'SLO',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },      
      availabilityHtml: {
        title: 'Availability',                
        type: 'html',
        filter: true,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },            
      latencySLO: {
        title: 'SLO',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      }, 
      latencyHtml: {
        title: 'Latency',                
        type: 'html',
        filter: true,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },            
      experienceSLO: {
        title: 'SLO',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },         
      experienceHtml: {
        title: 'Experience',                
        type: 'html',
        filter: true,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },            
      group:{
        title: 'Group',
        type: 'string',
        filter: true,
        width: '7em',
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true
      },     
      lead: {
        title: 'Lead',
        type: 'string',
        filter: true,
        width: '6em',
      },      
      featuresCount: {
        title: 'Fea...',
        type: 'string',
        filter: true,
        width: '2em',
      },            
    },
  };

  source: LocalDataSource = new LocalDataSource();
  options: any = {};  
  serviceGroup: string;
  themeSubscription: any;

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private portfolioGateway: PortfoliosGateway,    
    private router: Router, 
    private theme: NbThemeService,    
    private format: FormatService, 
    private activatedRoute: ActivatedRoute) { 
      
    }        


  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.serviceGroup = paramMap.get('group');      
      this.getProduct(this.productId);      
    });          
  }  
  getProduct(productId: number){
    this.productGateway.getProduct(productId).subscribe(data=>{
      this.currentProduct = data;
      this.portfolioGateway.getPortfoliosWithAvailabilities(productId, this.startDate, this.endDate, this.serviceGroup).subscribe(portfolios=>{
        const data = portfolios;        
        let newData = data.map(c=> {  
          c.availabilityHtml = this.format.buildStatusColumn(c.availability, c.availabilityErrorBudget , [c.availabilitySLO],['text-danger', 'text-success']);          
          c.latencyHtml = this.format.buildLatencyColumn(c.latency, c.latencySLO);                    
          c.experienceHtml = this.format.buildStatusColumn(c.experience, c.experienceErrorBudget , [c.experienceSLO], ['text-danger', 'text-success']);                    
          c.lead = this.format.extractLead(c.leaders);
          return c;
        });                
        
        this.source.load(newData);
      });
    });     
  }
 
  onCreate(event){    
    let queryParams: Params = {  };
    this.router.navigate(['/pages/portfolios/create'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onAnnual(event){    
    let queryParams: Params = {  };
    this.router.navigate(['/pages/portfolios/annual'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  
  onUserRowSelect(event): void {    
    const sourceId = event.data.id;
    let queryParams: Params = { portfolioId: sourceId };
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }  
}
