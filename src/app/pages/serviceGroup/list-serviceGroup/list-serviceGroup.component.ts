import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { FormatService } from '../../../@core/utils/format.service';


@Component({
  selector: 'app-list-serviceGroup',
  templateUrl: './list-serviceGroup.component.html',
  styleUrls: ['./list-serviceGroup.component.scss']
})
export class ListserviceGroupComponent extends ProductBaseComponent {
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected portfoliosGateway : PortfoliosGateway,
    protected theme: NbThemeService,
    protected format: FormatService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
  }   
  groupSelected : string = null;
  dailyTitle: String = "None";
  series: Array<any> = [];  
  debtSeries: Array<any> = [];  
  calendarSerie : Array<any> = [];  
  sourceServices: LocalDataSource = new LocalDataSource();
  source: LocalDataSource = new LocalDataSource();
  settingsServices = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },      
      slo: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },      
      qualityHtml: {
        title: 'Quality',                
        type: 'html',
        filter: false,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },
      previousHtml: {
        title: 'Previous',
        type: 'html',
        filter: false,
        width: '2em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },        
      budget: {
        title: 'Budget',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },
      
      availability: {
        title: 'Ava...',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },
      latency: {
        title: 'Lat...',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },      
     
      featuresCount: {
        title: 'Fea...',
        type: 'string',
        filter: false,
        width: '2em',
      },               
    },
  };


  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      previous: {
        title: 'Previous',
        type: 'number',
        filter: false,
        width: '3em',        
      },
      errorHtml: {
        title: 'Error Budget Debt',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '5em'        
      },      
      count: {
        title: 'Count',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      sloAvg: {
        title: 'SLO Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      sloMin: {
        title: 'SLO Min',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      qualityAvg: {
        title: 'Quality Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      qualityMin: {
        title: 'Quality Min',
        type: 'number',
        filter: false,
        width: '3em',
      },        
      availabilityAvg: {
        title: 'Availability Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      availabilityMin: {
        title: 'Availability Min',
        type: 'number',
        filter: false,
        width: '3em',
      },        
      latencyAvg: {
        title: 'Latency Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      latencyMin: {
        title: 'Latency Min',
        type: 'number',
        filter: false,
        width: '3em',
      },        
    },
  };

  onChangeQueryParameters(paramMap: ParamMap): void {       
    super.onChangeQueryParameters(paramMap);      
    this.portfoliosGateway.getPortfoliosGroup(this.productId, this.startDate, this.endDate).subscribe(data=>{

      const items =  data.items.map(c => {                
         c.errorHtml = this.format.buildTrendColumnValue(c.errorBudget, c.previous);
         return c;
        });
      this.source.load(items);      
      this.debtSeries = data.series;
    });
  }
  
  onRowSelect(event){
    // http://localhost:5000/products/4/reports/daily/services/series?start=2020-01-01T05:00:00.000Z&end=2020-04-29T16:11:51.970Z&group=Transferencias
    const group = event.data.name;
    this.dailyTitle = this.groupSelected = group;
    this.portfoliosGateway.getPortfoliosWithAvailabilities(this.productId, this.startDate, this.endDate, group).subscribe(portfolios=>{                
        let newData = portfolios.map(c=> {  
            c.delta = this.format.round3Decimals(c.quality - c.previous);          
            c.budget = this.format.round3Decimals(c.budget);                              
            c.previousHtml = this.format.buildTrendColumn(c.quality, c.previous);         
            c.qualityHtml = this.format.buildStatusColumn(c.quality, c.deploy, [c.slo], ['text-danger', 'text-success']);          
            return c;
          });                
        this.sourceServices.load(newData);
    });

    this.portfoliosGateway.getServicesDailyReport(this.productId, this.startDate, this.endDate, group).subscribe(data=>{      
      this.series = data;      
      this.calendarSerie = data;
    });
    
  }
  onServiceSelect(event){
    const serviceId = event.data.id;
    let queryParams: Params = { portfolioId: serviceId };
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onGotoServices(){
     let queryParams: Params = { group: this.groupSelected};
     this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onAnnualReport(event){    
    let queryParams: Params = {  };
    this.router.navigate(['/pages/groups/annual'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
}
