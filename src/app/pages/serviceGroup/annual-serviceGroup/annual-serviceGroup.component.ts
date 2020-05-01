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
  selector: 'app-annual-serviceGroup',
  templateUrl: './annual-serviceGroup.component.html',
  styleUrls: ['./annual-serviceGroup.component.scss']
})
export class AnnualServiceGroupComponent extends ProductBaseComponent {
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
  dailyTitle: string =  "Please select a group";
  series: Array<any> = [];    
  calendarSerie : Array<any> = [];  
  source: LocalDataSource = new LocalDataSource();
  sourceAvailability: LocalDataSource = new LocalDataSource();
  sourceLatency: LocalDataSource = new LocalDataSource();
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {      
      name: {
        title: 'Group',
        type: 'string',
        filter: false
      },
      count: {
        title: 'Count',
        type: 'number',
        filter: false,
        width: '3em',
      },         
      jan: {
        title: 'Jan',
        type: 'number',
        filter: false,
        width: '3em',
      },   
      febHtml: {
        title: 'Feb',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      marHtml: {
        title: 'Mar',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      aprHtml: {
        title: 'Apr',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      mayHtml: {
        title: 'May',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },  
      junHtml: {
        title: 'Jun',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      julHtml: {
        title: 'Jul',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      augHtml: {
        title: 'Aug',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      sepHtml: {
        title: 'Sep',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      octHtml: {
        title: 'Oct',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      novHtml: {
        title: 'Nov',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      decHtml: {
        title: 'Dec',
        type: 'html',
        filter: false,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
    },
  };

  onChangeQueryParameters(paramMap: ParamMap): void {       
    super.onChangeQueryParameters(paramMap);      
    this.portfoliosGateway.getPortfoliosGroupAnnual(this.productId, this.startDate).subscribe( data=>{
      const quality = data.quality;
      const availability = data.availability;
      const latency = data.latency;
      
      const tempQuality = quality.map(c=>{        
        c.febHtml = this.format.buildTrendColumnValue(c.feb, c.jan);
        c.marHtml = this.format.buildTrendColumnValue(c.mar, c.feb);
        c.aprHtml = this.format.buildTrendColumnValue(c.apr, c.mar);
        c.mayHtml = this.format.buildTrendColumnValue(c.may, c.apr);
        c.junHtml = this.format.buildTrendColumnValue(c.jun, c.may);
        c.julHtml = this.format.buildTrendColumnValue(c.jul, c.jun);
        c.augHtml = this.format.buildTrendColumnValue(c.aug, c.jul);
        c.sepHtml = this.format.buildTrendColumnValue(c.sep, c.aug);
        c.octHtml = this.format.buildTrendColumnValue(c.oct, c.sep);
        c.novHtml = this.format.buildTrendColumnValue(c.nov, c.oct);
        c.decHtml = this.format.buildTrendColumnValue(c.dec, c.nov);
        return c;
      });
      
      this.source.load(tempQuality);

      this.sourceAvailability.load(availability);
      this.sourceLatency.load(latency);
      this.series = data.weekly.series;
    });
  }
  
  onRowSelect(event){
    const group = event.data.name;    
    this.portfoliosGateway.getPortfoliosGroupAnnualCalendar(this.productId, group, this.startDate).subscribe( data=>{
      this.dailyTitle = data.name;
      this.calendarSerie = data.items.map( c=>{
        return [ echarts.format.formatTime('yyyy-MM-dd', c.date), c.oAve * 100];
      });         
    });
  }
}
