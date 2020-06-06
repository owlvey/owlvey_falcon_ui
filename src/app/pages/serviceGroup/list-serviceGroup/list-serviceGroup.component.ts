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
  latencySeries: Array<any> = [];  
  experienceSeries: Array<any> = [];  
  debtSeries: Array<any> = [];  
  calendarSerie : Array<any> = [];  
  latencyCalendarSerie : Array<any> = [];  
  experienceCalendarSerie : Array<any> = [];  
  sourceServices: LocalDataSource = new LocalDataSource();
  source: LocalDataSource = new LocalDataSource();



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
      count: {
        title: 'Count',
        type: 'number',
        filter: false,
        width: '3em',
      },                       
      availabilityAvg: {
        title: 'Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },      
      availabilityDebtHtml: {
        title: 'Debt',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '5em'        
      },        
      latencyAvg: {
        title: 'Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },      
      latencyDebtHtml: {
        title: 'Debt',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '5em'        
      },        
      experienceAvg: {
        title: 'Avg',
        type: 'number',
        filter: false,
        width: '3em',
      },      
      experienceDebtHtml: {
        title: 'Debt',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '5em'        
      },  
         
    },
  };

  settingsServices = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 20
    },
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },      
      availabilitySLO: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },            
      availabilityHtml: {
        title: 'Availability',                
        type: 'html',
        filter: false,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },  
      availabilityDebt:{
        title: 'Debt',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },
      latencySLO: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      }, 
      latencyHtml: {
        title: 'Latency',                
        type: 'html',
        filter: false,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },
      latencyDebt:{
        title: 'Debt',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },     
      experienceSLO: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },         
      experienceHtml: {
        title: 'Experience',                
        type: 'html',
        filter: false,
        width: '3em',
        editable: false,
        sort:true,
        sortDirection: 'asc',
        compareFunction:this.format.compareIconNumberColumn,
      },     
      experienceDebt:{
        title: 'Debt',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },                          
    },
  };

  onChangeQueryParameters(paramMap: ParamMap): void {       
    super.onChangeQueryParameters(paramMap);      
    this.portfoliosGateway.getPortfoliosGroup(this.productId, this.startDate, this.endDate).subscribe(data=>{
      const items =  data.items.map(c => {                         
         c.availabilityDebtHtml = this.format.buildDebtColumnValueSingle(c.availabilityDebt, '');
         c.latencyDebtHtml = this.format.buildDebtColumnValueSingle(c.latencyDebt, '');
         c.experienceDebtHtml = this.format.buildDebtColumnValueSingle(c.experienceDebt, '');
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
            c.availabilityHtml = this.format.buildStatusColumn(c.availability, c.availabilityErrorBudget , [c.availabilitySLO],['text-danger', 'text-success']);          
            c.latencyHtml = this.format.buildLatencyColumn(c.latency, c.latencySLO);                    
            c.experienceHtml = this.format.buildStatusColumn(c.experience, c.experienceErrorBudget , [c.experienceSLO], ['text-danger', 'text-success']);                                                           
            return c;
          });                
        this.sourceServices.load(newData);
    });

    this.portfoliosGateway.getServicesDailyReport(this.productId, this.startDate, this.endDate, group).subscribe(data=>{      
      this.series = data.availabilityDetail;      
      this.latencySeries = data.latencyDetail;
      this.experienceSeries = data.experienceDetail;      
      this.calendarSerie = [data.availability];
      this.latencyCalendarSerie = [data.latency];
      this.experienceCalendarSerie = [data.experience];
    });
    
  }
  onServiceSelect(event){
    const serviceId = event.data.id;
    let queryParams: Params = { portfolioId: serviceId };
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }  
  onAnnualReport(event){    
    let queryParams: Params = {  };
    this.router.navigate(['/pages/groups/annual'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
}
