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
    const group = event.data.name;
    let queryParams: Params = { group: group};
    this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

}
