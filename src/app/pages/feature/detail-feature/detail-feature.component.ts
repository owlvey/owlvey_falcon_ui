import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FeaturesGateway } from '../../../@core/data/features.gateway';


@Component({
  selector: 'app-detail-feature',
  templateUrl: './detail-feature.component.html',
  styleUrls: ['./detail-feature.component.scss']
})
export class DetailFeatureComponent implements OnInit, AfterViewInit, OnDestroy {
  
  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentSource : any= {};    
  productId = 0;
  featureId = 0;
  themeSubscription: any;
  series: Array<any> = [];
  
  startDate: Date = new Date();
  endDate: Date;  

  incidentSettings={
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 10
    },
    columns: {      
      title: {
        title: 'title',
        type: 'string',
        filter: false
      },
      start:{
        title: 'Start',        
        filter: false,        
        editable: false,
        width: '20em'
      },
      ttd:{
        title: 'TTD',
        type: 'number',
        width: '2em',
        filter: false
      },
      tte:{
        title: 'TTE',
        type: 'number',
        width: '2em',
        filter: false
      },
      ttf:{
        title: 'TTF',
        type: 'number',
        width: '2em',
        filter: false
      },
      ttm:{
        title: 'TTM',
        type: 'number',
        width: '2em',
        filter: false
      }
    }
  };
  incidentSource: LocalDataSource = new LocalDataSource();
  
  squadsSettings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 5
    },
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      }      
    }
  };

  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 10
    },
    columns: {      
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        sort:true,
        width: '3em',
        sortDirection: 'asc'     
      },
      source: {
        title: 'Source',
        type: 'string',
        filter: false,        
      },
      kind: {
        title: 'Type',
        type: 'string',
        filter: false,        
        width: '3em',
      },
      good:{
        title: 'Good',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },
      total: {
        title: 'Total',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },            
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },                  
    },
  };

  source: LocalDataSource = new LocalDataSource();

  squadSource: LocalDataSource = new LocalDataSource();

  portfolioSettings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 5
    },
    columns: {      
      id: {
        title: 'Id',
        type: 'number',
        width: '2em',
        filter: false
      },
      name: {
        title: 'name',
        type: 'string',
        filter: false
      },       
      slo: {
        title: 'slo',
        type: 'number',
        filter: false,
        width: '2em',
        editable: false
      }  
    },
  }
  portfolioSource: LocalDataSource = new LocalDataSource(); 
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private toastr: NbToastrService,
    private sourcesGateway: SourcesGateway,    
    private featuresGateway: FeaturesGateway,   
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
      this.featureId = parseInt(paramMap.get('featureId'));       
      this.startDate = new Date(paramMap.get("start"));           
      this.endDate = new Date(paramMap.get("end"));                 
      this.getSource();      
      this.getDaily();
    });          
  }  

  getSource(){
    this.featuresGateway.getFeatureWithAvailabilities(this.featureId, this.startDate, this.endDate).subscribe(feature=>{
      this.currentSource = feature;      
      this.source.load(feature.indicators);
      this.squadSource.load(feature.squads);
      this.incidentSource.load(feature.incidents);
      this.portfolioSource.load(feature.services);
      this.renderSliBarOptions();
    });        
  }

  renderSliBarOptions(){
    
    const categories = this.currentSource.indicators.map(c=>{
      return c.source;
    });
    const goods = this.currentSource.indicators.map(c=>{
      return c.good;
    });
    const bads = this.currentSource.indicators.map(c=>{
      return c.total - c.good;
    });

    this.sliBarOptions = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            
              type : 'shadow'       
          }
      },
      legend: {
          data: ['Good', 'Bad']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis:  {
          type: 'value'
      },
      yAxis: {
          type: 'category',
          data: categories
      },
      series: [
          {
              name: 'Interactions',
              type: 'bar',
              stack: 'availability',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: goods
          },
          {
              name: '邮件营销',
              type: 'bar',
              stack: 'availability',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: bads
          }
      ]
    };
  }

  getDaily(){
    this.featuresGateway.getDaily(this.featureId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
      const datas = this.series[0].items.map(c=>{        
        return [ echarts.format.formatTime('yyyy-MM-dd', c.date), c.oAva * 100];
      });      
      
      this.calendarOptions = {
        tooltip: {
          formatter: function (params) {                            
              return params.value[0] + ', availability:' + params.value[1];
          }
        },
        visualMap: {
            show: false,
            inRange: {
              color: ['#cc0033', '#ff9933', '#ffde33', '#096'],
              opacity: 0.8
            },
            min: 0,
            max: 100
        },
        calendar: {
            range: String((new Date()).getFullYear())
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: datas,        
        }
      };
    });  


   
  }

  onReportClick(event){        
    this.getDaily();
  }

  onIndicatorsRowSelect(event){
    const sourceId = event.data.sourceId;
    let queryParams: Params = { sourceId: sourceId };
    this.router.navigate(['/pages/sources/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onSquadRowSelect(event){
    const squadId = event.data.id;
    let queryParams: Params = { squadId: squadId };
    this.router.navigate(['/pages/squads/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  onBackClick(event){    
    //let queryParams: Params = { featureId: null };
    //this.router.navigate(['/pages/features'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                 
    this.location.back();
  }
  onEditClick(event){
    let queryParams: Params = { };
    this.router.navigate(['/pages/features/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onIncidentRowSelect(event){
    const incidentId = event.data.id;
    let queryParams: Params = { incidentId: incidentId };
    this.router.navigate(['/pages/incidents/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  onPortfolioRowSelect(event){
    const portfolioId = event.data.id;
    let queryParams: Params = { portfolioId: portfolioId };
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  ngOnDestroy(): void {
    
  }     
  onDeleteClick(event){    
    this.featuresGateway.deleteFeature(this.featureId).subscribe(res=>{
      this.toastr.success("Feature was deleted");
      let queryParams: Params = { featureId : null };
      this.router.navigate(['/pages/features'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
    }, (error) => {
      this.isLoading = false;
      this.toastr.warning("Something went wrong, please try again.", "Warning")
    });          
  }


  echartCalendarInstance: any;
  calendarOptions: any;

  onCalendar(ec) {
    this.echartCalendarInstance = ec;
  }   

  echartSliBarInstance: any;
  sliBarOptions: any;
  onSliBarOptions(ec){
    this.echartSliBarInstance = ec;
  }

  ngAfterViewInit() {    
    
  }
}