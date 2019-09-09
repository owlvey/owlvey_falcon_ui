import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';

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
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      slo: {
        title: 'SLO',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      impact: {
        title: 'Impact',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      availability: {
        title: 'Availability',                
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      budget: {
        title: 'Budget',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      budgetMinutes:{
        title: 'Budget (min)',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      mttd:{
        title: 'MTTD (min)',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },      
      mttr:{
        title: 'MTTR (min)',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      deploy: {
        title: 'Deploy',
        type: 'string',
        filter: true,
        width: '3em',
        editable: false
      },
      risk:{
        title: 'Risk',
        type: 'string',
        filter: true,
        width: '3em',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true
      },      
      featuresCount: {
        title: 'Features',
        type: 'string',
        filter: true,
        width: '3em',
      },            
    },
  };

  source: LocalDataSource = new LocalDataSource();
  options: any = {};
  series: Array<any> = [];  

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private portfolioGateway: PortfoliosGateway,    
    private router: Router, 
    private activatedRoute: ActivatedRoute) { 
      
    }        
  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getProduct(this.productId);
      this.getDaily(); 
    });          
  }  
  getProduct(productId: number){
    this.productGateway.getProduct(productId).subscribe(data=>{
      this.currentProduct = data;
      this.portfolioGateway.getPortfoliosWithAvailabilities(productId, this.startDate, this.endDate).subscribe(portfolios=>{
        let c = portfolios.map(c=> {          
          return c;
        });
        this.source.load(portfolios);
      });
    });     
  }
  getDaily(){
    this.productGateway.getDaily(this.productId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
    });
  }
  onCreate(event){

  }
  onUserRowSelect(event): void {    
    const sourceId = event.data.id;
    let queryParams: Params = { portfolioId: sourceId };
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
}
