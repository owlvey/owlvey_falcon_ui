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
      status: {
        title: 'Status',
        type: 'number',
        filter: false,
        width: '3em',
      },
      previous: {
        title: 'Previous',
        type: 'number',
        filter: false,
        width: '3em',
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
      this.source.load(data);
    });
  }
  
  onRowSelect(event){
    const group = event.data.name;
    let queryParams: Params = { group: group};
    this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

}
