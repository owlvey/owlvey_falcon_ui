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
  dailyTitle: String = "Please select a group";
  series: Array<any> = [];    
  calendarSerie : Array<any> = [];  
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
      statusHtml: {
        title: 'Efectiveness',
        type: 'html',
        filter: false,
        width: '5em',
        compareFunction:this.format.compareIconNumberColumn,
      },
      previousHtml: {
        title: 'Previous',
        type: 'html',
        filter: false,
        width: '3em',
        compareFunction:this.format.compareIconNumberColumn,
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
      const items =  data.map(c => {
         c.statusHtml = this.format.buildStatusColumn(c.status);
         c.previousHtml = this.format.buildTrendColumn(c.status, c.previous);
         return c;
        });
      this.source.load(items);
    });
  }
  
  onRowSelect(event){
    // http://localhost:5000/products/4/reports/daily/services/series?start=2020-01-01T05:00:00.000Z&end=2020-04-29T16:11:51.970Z&group=Transferencias
    const group = event.data.name;
    this.dailyTitle = this.groupSelected = group;

    this.productGateway.getServicesDailyReport(this.productId, this.startDate, this.endDate, group).subscribe(data=>{      
      this.series = data.series;      
      this.calendarSerie = this.series[0].items.map(c=>{        
        return [ echarts.format.formatTime('yyyy-MM-dd', c.date), c.oAve * 100];
      });        
    });
    
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
