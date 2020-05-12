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
      perPage: 20
    },
    columns: {           
      slo: {
        title: 'SLO',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },      
      qualityHtml: {
        title: 'Quality',                
        type: 'html',
        filter: true,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },
   
      budget: {
        title: 'Budget',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false,        
      },
      previousHtml: {
        title: 'Previous',
        type: 'html',
        filter: true,
        width: '2em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },        
      availability: {
        title: 'Ava...',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      latency: {
        title: 'Lat...',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      experience: {
        title: "Exp...",
        type: "number",
        filter: true,
        width: "3em",
        editable: false
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

  totalServices: number = 0;
  sloCompliance: number = 0;
  efectiveness: number = 0;

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
        this.totalServices = data.length;
        this.sloCompliance = 0;
        this.efectiveness = 0;
        let newData = data.map(c=> {  

          if (c.quality >= c.slo){
            this.sloCompliance += 1;
          }          
          c.delta = this.format.round3Decimals(c.quality - c.previous);          
          c.budget = this.format.round3Decimals(c.budget);                              
          c.previousHtml = this.format.buildTrendColumn(c.quality, c.previous);         
          c.qualityHtml = this.format.buildStatusColumn(c.quality, c.deploy, [c.slo], ['text-danger', 'text-success']);          
          return c;
        });                
        if (this.totalServices){
          this.efectiveness = this.format.round2Decimals( this.sloCompliance / this.totalServices );
        }        
        this.source.load(newData);
      });
    });     
  }
 
  onCreate(event){    
    let queryParams: Params = {  };
    this.router.navigate(['/pages/portfolios/create'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onUserRowSelect(event): void {    
    const sourceId = event.data.id;
    let queryParams: Params = { portfolioId: sourceId };
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }  
}
