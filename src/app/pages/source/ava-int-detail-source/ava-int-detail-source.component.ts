import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { FormatService } from '../../../@core/utils/format.service';
import { BaseDetailSourceComponent } from '../base-detail-source-component';


@Component({
  selector: 'app-ava-int-detail-source',
  templateUrl: './ava-int-detail-source.component.html',
  styleUrls: ['./ava-int-detail-source.component.scss']
})
export class AvaIntDetailSourceComponent extends BaseDetailSourceComponent implements OnInit, AfterViewInit {
  

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentSource : any= {};    
  
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];  
  calendarSerie: Array<any> = [];

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
      id:{
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em'   
      },
      name: {
        title: 'Name',        
        filter: true,
      },   
    },
  };
  source: LocalDataSource = new LocalDataSource();
  
  constructor(
    location: Location,
    customerGateway: CustomersGateway,
    productGateway: ProductsGateway,
    sourcesGateway: SourcesGateway,    
    toastr: NbToastrService,
    theme: NbThemeService, 
    format: FormatService,
    router: Router, 
    activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, sourcesGateway, toastr, theme, format, router, activatedRoute);      
    }        

  ngOnInit() {         
    super.baseOnInit();
  }  
  
  getSource(){    
    this.sourcesGateway.getAvailabilityInteractionSourceWithAvailability(this.sourceId, this.startDate, this.endDate).subscribe(data=>{
      this.currentSource = data;      
      
      let tmpFeatures = [];
      Object.keys(this.currentSource.features).forEach( k => tmpFeatures.push( { "id": this.currentSource.features[k], "name": k }) );
      this.source.load(tmpFeatures);


      let tmpSource = [ ['tvalue', 'name'] ];
      for (let key in this.currentSource.clues) {
        let value = this.currentSource.clues[key];
        tmpSource.push([ value, key]);
      }
      let temporalDs = { source: tmpSource };
      this.clueBarOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
        },
        dataset: temporalDs,
        grid: {containLabel: true},
        xAxis: {name: 'amount'},
        yAxis: {type: 'category'},
        
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'name'
                }
            }
        ]
      };
    });    
  }
  getDaily(){

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echartsColors: any = config.variables.echarts;

      this.sourcesGateway.getDaily(this.sourceId, this.startDate, this.endDate).subscribe(data=>{                      
        this.series = data.items;   
        this.calendarSerie = this.series.map(c=>{        
          return [ this.format.extractDateStringFromUtc(c.date), c.oAve * 100];
        });                     
  
      });
      
    });

    
  }

  
  onItemsClick($event){    
    let queryParams: Params = { };
    this.router.navigate(['/pages/sources/availability/interaction/items'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });             
  }  
  
  onEditClick(event){
    let queryParams: Params = { };
    this.router.navigate(['/pages/sources/availability/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  
  ngAfterViewInit() {    
    
  }

  echartCalendarInstance: any;
  calendarOptions: any;

  onCalendar(ec) {
    this.echartCalendarInstance = ec;
  }  


  echartClueBarInstance : any; 
  clueBarOptions: any ;


  onClueBar(ec){
    this.echartClueBarInstance = ec;
  }
  onUserRowSelect(event): void {    
    const featureId = event.data.id;
    let queryParams: Params = { featureId : featureId };
    this.router.navigate(['/pages/features/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

}