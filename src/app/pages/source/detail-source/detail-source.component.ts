import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-detail-source',
  templateUrl: './detail-source.component.html',
  styleUrls: ['./detail-source.component.scss']
})
export class DetailSourceComponent implements OnInit, AfterViewInit {
  

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentSource : any= {};    
  productId = 0;
  sourceId = 0;
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];
  startDate: Date = new Date();
  endDate: Date;  
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
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private toastr: NbToastrService,
    private theme: NbThemeService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {       
      this.endDate = new Date();
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 365);
    }        

  ngOnInit() {         
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.sourceId = parseInt(paramMap.get('sourceId'));   
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getSource();
      this.getDaily();
    });          
  }  

  getSource(){    
    this.sourcesGateway.getSourceWithAvailability(this.sourceId, this.startDate, this.endDate).subscribe(data=>{
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
          return [ echarts.format.formatTime('yyyy-MM-dd', c.date), c.oAve * 100];
        });                     
  
      });
      
    });

    
  }

  
  onItemsClick($event){    
    let queryParams: Params = { };
    if (this.currentSource.kind == "Interaction"){
      this.router.navigate(['/pages/sources/items'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
    }
    else {
      this.router.navigate(['/pages/sources/proportion'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
    }
    
  }  
  onBackClick($event){    
    this.location.back();
  }
  onEditClick(event){
    let queryParams: Params = { };
    this.router.navigate(['/pages/sources/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onDeleteClick(event){
    if (window.confirm('Are you sure you want to delete?')) {
      this.sourcesGateway.deleteSource(this.sourceId).subscribe(res=>{
        this.toastr.success("Source was deleted");
        let queryParams: Params = { sourceId : null };
        this.router.navigate(['/pages/sources'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
      }, (error) => {        
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
      
    } else {
      event.confirm.reject();
    }
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