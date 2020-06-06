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
  latencySeries: Array<any> = [];    
  experienceSeries: Array<any> = [];    
  calendarSerie : Array<any> = [];  
  latencyCalendarSerie : Array<any> = [];  
  experienceCalendarSerie : Array<any> = [];  
  
  sourceAvailability: LocalDataSource = new LocalDataSource();
  sourceLatency: LocalDataSource = new LocalDataSource();
  sourceExperience: LocalDataSource = new LocalDataSource();
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
      janHtml: {
        title: 'Jan',
        type: 'html',
        filter: false,
        width: '3em',
        compareFunction:this.format.compareIconNumberColumn,
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
      
      const availability = data.availability;
      const latency = data.latency;
      const experience = data.experience;
      
      let result = [availability, latency, experience].map(group=>{
        const temp = group.map(c =>{                  
          c.janHtml = this.format.buildDebtColumnValueSingle(c.jan, '');
          c.febHtml = this.format.buildDebtColumnValue(c.feb, c.jan);
          c.marHtml = this.format.buildDebtColumnValue(c.mar, c.feb);
          c.aprHtml = this.format.buildDebtColumnValue(c.apr, c.mar);
          c.mayHtml = this.format.buildDebtColumnValue(c.may, c.apr);
          c.junHtml = this.format.buildDebtColumnValue(c.jun, c.may);
          c.julHtml = this.format.buildDebtColumnValue(c.jul, c.jun);
          c.augHtml = this.format.buildDebtColumnValue(c.aug, c.jul);
          c.sepHtml = this.format.buildDebtColumnValue(c.sep, c.aug);
          c.octHtml = this.format.buildDebtColumnValue(c.oct, c.sep);
          c.novHtml = this.format.buildDebtColumnValue(c.nov, c.oct);
          c.decHtml = this.format.buildDebtColumnValue(c.dec, c.nov);
          return c;
        });
        return temp;
      })
            
      this.sourceAvailability.load(result[0]);
      this.sourceLatency.load(result[1]);
      this.sourceExperience.load(result[2]);
      this.series = data.series.availabilityDetail;      
      this.latencySeries = data.series.latencyDetail;
      this.experienceSeries = data.series.experienceDetail;

      this.calendarSerie = [data.series.availability];
      this.latencyCalendarSerie = [data.series.latency];
      this.experienceCalendarSerie = [data.series.experience];
    });
  }
  
  onRowSelect(event){
    const group = event.data.name;  
    this.dailyTitle = group;
    this.portfoliosGateway.getPortfoliosGroupAnnualCalendar(this.productId, group, this.startDate).subscribe(data=>{
      this.calendarSerie = data;
    });
  }
}
