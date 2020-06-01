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
import { ProductBaseComponent } from '../../common/components/base-product.components';

@Component({
  selector: 'app-annual-portfolio',
  templateUrl: './annual-portfolio.component.html',
  styleUrls: ['./annual-portfolio.component.scss']
})
export class AnnualPortfolioComponent extends ProductBaseComponent {
  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 50
    },
    columns: {                       
      name: {
        title: 'Name',
        type: 'string',
        filter: true
      },      
      janHtml: {
        title: 'Jan',
        type: 'html',
        filter: true,
        width: '3em',
        compareFunction:this.format.compareIconNumberColumn,
      },   
      febHtml: {
        title: 'Feb',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      marHtml: {
        title: 'Mar',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      aprHtml: {
        title: 'Apr',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      mayHtml: {
        title: 'May',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },  
      junHtml: {
        title: 'Jun',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      julHtml: {
        title: 'Jul',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      augHtml: {
        title: 'Aug',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      sepHtml: {
        title: 'Sep',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      octHtml: {
        title: 'Oct',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      novHtml: {
        title: 'Nov',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },         
      decHtml: {
        title: 'Dec',
        type: 'html',
        filter: true,
        width: '4em',
        compareFunction:this.format.compareIconNumberColumn,
      },                  
    },
  };
  currentService: any = null;
  sourceAvailability: LocalDataSource = new LocalDataSource();
  sourceLatency: LocalDataSource = new LocalDataSource();
  sourceExperience: LocalDataSource = new LocalDataSource();

  availabilityPieces: Array<any> = [];
  latencyPieces: Array<any> = [];
  experiencePieces: Array<any> = [];

  calendarSerie: Array<any> = [];
  latencyCalendarSerie: Array<any> = [];
  experienceCalendarSerie: Array<any> = [];

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected portfolioGateway: PortfoliosGateway,    
    protected router: Router, 
    protected theme: NbThemeService,    
    protected format: FormatService, 
    protected activatedRoute: ActivatedRoute) { 
      super(location, customerGateway, productGateway, theme, router, activatedRoute);           
    } 
    onChangeQueryParameters(paramMap: ParamMap){      
      super.onChangeQueryParameters(paramMap);
      this.loadReport();
    }
    loadReport(){
      this.portfolioGateway.getPortfoliosAnnual(this.productId, this.startDate).subscribe(data=>{
        const availability = data.availability;
        const latency = data.latency;
        const experience = data.experience;
        let result = [availability, experience].map(group=>{
          const temp = group.map(c =>{        
            c.janHtml = this.format.buildTrendColumnValue(c.jan, c.jan);
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
          return temp;
        })

        let latencyResult = latency.map(c =>{        
          c.janHtml = this.format.buildTrendLatencyColumnValue(c.jan, c.jan);
          c.febHtml = this.format.buildTrendLatencyColumnValue(c.feb, c.jan);
          c.marHtml = this.format.buildTrendLatencyColumnValue(c.mar, c.feb);
          c.aprHtml = this.format.buildTrendLatencyColumnValue(c.apr, c.mar);
          c.mayHtml = this.format.buildTrendLatencyColumnValue(c.may, c.apr);
          c.junHtml = this.format.buildTrendLatencyColumnValue(c.jun, c.may);
          c.julHtml = this.format.buildTrendLatencyColumnValue(c.jul, c.jun);
          c.augHtml = this.format.buildTrendLatencyColumnValue(c.aug, c.jul);
          c.sepHtml = this.format.buildTrendLatencyColumnValue(c.sep, c.aug);
          c.octHtml = this.format.buildTrendLatencyColumnValue(c.oct, c.sep);
          c.novHtml = this.format.buildTrendLatencyColumnValue(c.nov, c.oct);
          c.decHtml = this.format.buildTrendLatencyColumnValue(c.dec, c.nov);
          return c;
        });
              
        this.sourceAvailability.load(result[0]);
        this.sourceLatency.load(latencyResult);
        this.sourceExperience.load(result[1]);        
        
      });
    }

    onUserRowSelect(event){      
      const id = event.data.id;
      const start = new Date(this.startDate.getFullYear(), 0, 1); 
      const end = new Date(this.startDate.getFullYear(), 11, 31); 
      this.portfolioGateway.getPortfolio(id).subscribe(currentService=>{
        this.currentService = currentService;
        this.portfolioGateway.getDaily(id, start, end).subscribe(data=>{        
        
          this.availabilityPieces = [
             { gte: currentService.availabilitySLO * 100, lte: 100,  color: '#096',}, 
             { gt: 0, lt: currentService.availabilitySLO * 100, color: '#cc0033', }];                
          
          this.latencyPieces = [
            { gte: 0, lte: currentService.latencySLO,  color: '#096',}, 
            { gt: currentService.latencySLO, lt:  currentService.latencySLO * 30, color: '#cc0033', }];                          
          
          this.experiencePieces = [
            { gte: currentService.experienceSLO * 100, lte: 100,  color: '#096',}, 
            { gt: 0, lt: currentService.experienceSLO * 100, color: '#cc0033', }];                         
          
          this.calendarSerie = data.availability.items.map(c=>{        
             return [ this.format.extractDateStringFromUtc(c.date), c.oAve * 100];
          }); 
          this.latencyCalendarSerie  = data.latency.items.map(c=>{        
            return [ this.format.extractDateStringFromUtc(c.date), c.oAve];
          }); 
          this.experienceCalendarSerie  = data.experience.items.map(c=>{        
            return [ this.format.extractDateStringFromUtc(c.date), c.oAve * 100];
          }); 
        });  


      });

      

    }
      
}
