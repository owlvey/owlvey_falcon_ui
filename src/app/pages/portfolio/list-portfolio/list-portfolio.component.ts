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
      availability: {
        title: 'Availability',                
        type: 'number',
        filter: true,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc'
      },
      budget: {
        title: 'Budget',
        type: 'number',
        filter: true,
        width: '2em',
        editable: false
      },                  
      deploy: {
        title: 'Action',
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
        width: '2em',
      },            
    },
  };

  /*
  mttms:{
        title: 'MTTM',
        type: 'string',
        filter: true,
        width: '10rem',
        editable: false
      },     
  */ 

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
    this.productGateway.getServicesDailyReport(this.productId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;

      const datas = this.series[0].items.map(c=>{        
        return [ echarts.format.formatTime('yyyy-MM-dd', c.date), c.oAva * 100];
      });      
      
      this.serviceCalendarOptions = {
        tooltip: {
          formatter: function (params) {                          
              return params.value[0] +  ', availability:' + params.value[1];
          }
        },
        visualMap: {
            show: false,
            inRange: {
              color: ['#cc0033', '#ff9933', '#ffde33', '#096'],
              opacity: 0.8
            },
            min: 0,
            max: 100
        },
        calendar: {
            range: String((new Date()).getFullYear())
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: datas,        
        }
      };
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


  echartCalendarInstance: any;
  serviceCalendarOptions: any;
  
  onServiceCalendar(ec) {
    this.echartCalendarInstance = ec;
  }
}
