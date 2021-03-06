import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService, NbWindowService, NbWindowConfig } from '@nebular/theme';
import { FormatService } from '../../../@core/utils/format.service';
import { RisksGateway } from 'app/@core/data/risks.gateway';
import { CreateSecuritySourceComponent } from './../../risks/create-security-risk/create-security-source.component';
import { debug } from 'console';
import { CreateReliabilitySourceComponent } from 'app/pages/risks/create-reliability-risk/create-reliability-source.component';


@Component({
  selector: 'app-detail-source',
  templateUrl: './detail-source.component.html',
  styleUrls: ['./detail-source.component.scss']
})
export class DetailSourceComponent
implements OnInit, AfterViewInit, OnDestroy {

  sourceId: number = 0;
  productId = 0;
  startDate: Date = new Date();
  endDate: Date;

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentSource : any= {};

  themeSubscription: any;
  options: any = {};
  availabilitySeries: Array<any> = [];
  availabilityCalendarSerie: Array<any> = [];
  latencySeries: Array<any> = [];
  latencyCalendarSerie: Array<any> = [];
  experienceSeries: Array<any> = [];
  experienceCalendarSerie: Array<any> = [];

  optionsScalability: any = {};
  optionsDailyScalability: any = {};
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

  journeySettings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 10
    },
    columns: {
      name: {
        title: 'Name',
        filter: true,
      },
      availabilitySLO:{
        title: 'Availability SLO',
        type: 'number',
        filter: true,
        width: '3em'
      },
      latencySLO:{
        title: 'Latency SLO',
        type: 'number',
        filter: true,
        width: '3em'
      },
      experienceSLO:{
        title: 'Experience SLO',
        type: 'number',
        filter: true,
        width: '3em'
      },
    },
  };
  journeySource: LocalDataSource = new LocalDataSource();





  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected sourcesGateway: SourcesGateway,
    protected toastr: NbToastrService,
    protected theme: NbThemeService,
    protected format: FormatService,
    protected router: Router,
    protected riskGateway: RisksGateway,
    protected activatedRoute: ActivatedRoute,
    protected windowService: NbWindowService) {
      this.endDate = new Date();
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 365);
    }
  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
        this.productId = parseInt(paramMap.get('productId'));
        this.sourceId = parseInt(paramMap.get('sourceId'));
        this.startDate = new Date(paramMap.get('start'));
        this.endDate = new Date(paramMap.get('end'));
        this.getSource();
        this.getRisks();
    });
  }
  //#region  Risk

  reliabilitySettings = {
    mode: 'external',
    pager: {
      perPage: 5
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
      ettr:{
        title: 'ETTR',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      userImpact:{
        title: 'User Impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      ettFail:{
        title: 'Time To Fail',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      incidentsPerYear : {
        title: 'Incidents Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      badMinutesPerYear  : {
        title: 'Bad Minutes Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };
  reliabilitySource : LocalDataSource = new LocalDataSource();

  securitySettings = {
    mode: 'external',
    pager: {
      perPage: 5
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      risk:{
        title: 'Risk',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      threatAgentFactor:{
        title: 'Threat Agent',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      vulnerabilityFactor:{
        title: 'Vulnerability',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      likeHood:{
        title: 'Likehood',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      technicalImpact:{
        title: 'Technical impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      businessImpact:{
        title: 'Business impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      impact:{
        title: 'Impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };
  securitySource : LocalDataSource = new LocalDataSource();
  onSecurityRiskSelect(item){
    const riskId = item.data.id;
    const queryParams: Params = { riskId: riskId};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/risks/security/detail'], extras);
  }
  onReliabilityRiskSelect(item){
    const riskId = item.data.id;
    const queryParams: Params = { riskId: riskId};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/risks/reliability/detail'], extras);
  }
  getRisks(){
    this.riskGateway.getSecurityRisksBySource(this.sourceId).subscribe(data=>{
      this.securitySource.load(data);
    });
    this.riskGateway.getReliabilityRisksBySource(this.sourceId).subscribe(data=>{
      this.reliabilitySource.load(data);
    });
  }
  //#endregion
  onBackClick($event){
    this.location.back();
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


  getSource(){
    this.sourcesGateway.getSourceWithDetail(this.sourceId, this.startDate, this.endDate).subscribe(data=>{
      this.currentSource = data;

      this.availabilitySeries = data.daily.map(c=>{
        let d = { date: c.date, oAve: c.measure.availability };
        return d;
      });
      this.availabilityCalendarSerie  = this.availabilitySeries.map( c => {
        return [ this.format.extractDateStringFromUtc(c.date), c.oAve * 100];
      });

      this.latencySeries = data.daily.map(c=>{
        let d = { date: c.date, oAve: c.measure.latency };
        return d;
      });
      this.latencyCalendarSerie  = this.latencySeries.map( c => {
        return [ this.format.extractDateStringFromUtc(c.date), c.oAve];
      });

      this.experienceSeries = data.daily.map(c=>{
        let d = { date: c.date, oAve: c.measure.experience };
        return d;
      });
      this.experienceCalendarSerie  = this.experienceSeries.map( c => {
        return [ this.format.extractDateStringFromUtc(c.date), c.oAve * 100];
      });

      this.source.load(this.currentSource.features);
      this.journeySource.load(this.currentSource.journeys);

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

  getScalability(colors){
    this.sourcesGateway.getAvailabilityInteractionSourceScalability(this.sourceId, this.startDate, this.endDate).subscribe(data=>{
      const serieGood = {
        name : "Good",
        type : 'line',
        data: data.dailyInteractions.map(c=>{
            return { name: c.data, value: [ this.format.extractDateStringFromUtc(c.date), c.good.toFixed(2)] };
          }
        ),
        stack: 'interaction',
        areaStyle: {},
        showSymbol: true,
        hoverAnimation: false,
       };
       const serieBad = {
        name : "Bad",
        type : 'line',
        data: data.dailyInteractions.map(c=>{
            return { name: c.data, value: [ this.format.extractDateStringFromUtc(c.date), c.bad.toFixed(2)] };
          }
        ),
        stack: 'interaction',
        areaStyle: {},
        showSymbol: true,
        hoverAnimation: false,
       };

       this.optionsDailyScalability = {

        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],

        title: {
          text: 'Daily Interactions',
          left: 'center',
          textStyle: {
            color: echarts.textColor,
            fontSize: 16
          },
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: echarts.bg
              }
          }
        },
        xAxis:
        {
            name: 'Dates',
            nameLocation: 'middle',
            nameGap: 50,
            type: 'time',
            splitLine: {
              show: false,
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          }, yAxis:
          {
            name: 'Requests Good and Bad per date',
            nameLocation: 'middle',
            nameGap: 50,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        series: [serieGood, serieBad],
      };

      const min_value =  Math.min.apply(null, data.dailyTotal);
      const max_value = Math.max.apply(null, data.dailyTotal);
      const linealY = [];
      for (let index = min_value; index < max_value; index += (max_value - min_value) / 100 ) {
         linealY.push([index, data.dailyIntercept + data.dailySlope * index]);
      }

      var linealX = data.dailyTotal.map(function(e, i) {
        return [e, data.dailyBad[i]];
      });

      this.optionsScalability = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        title: {
          text: 'Scalability Regression',
          subtext: `Pearson: ${data.dailyCorrelation} | R2: ${data.dailyR2}| Y = ${data.dailyIntercept} + ${data.dailySlope}X` ,
          left: 'center',
          textStyle: {
            color: echarts.textColor,
            fontSize: 16
          },
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
            }
        },

        xAxis: {
            name: 'Total requests per day',
            nameLocation: 'middle',
            nameGap: 50,
            splitLine: {
              lineStyle: {
                  type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
        },
        yAxis: {
            type: 'value',
            name: 'Bad requests per day',
            nameGap: 50,
            nameLocation: 'middle',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
                type: 'dashed'
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
        },
        series: [{
              data: linealX,
              type: 'scatter',
              smooth: true
            },
            {
              name: 'line',
              type: 'line',
              smooth: true,
              showSymbol: false,
              data: linealY,
            }
          ]
      };
    });

  }

  onAvaialbilityItemsClick($event){
    let queryParams: Params = { group: 'Availability' };
    this.router.navigate(['/pages/sources/items'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onLatencyItemsClick($event){
    let queryParams: Params = { group: 'Latency' };
    this.router.navigate(['/pages/sources/items'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onExperienceItemsClick($event){
    let queryParams: Params = { group: 'Experience' };
    this.router.navigate(['/pages/sources/items'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }


  onEditClick(event){
    let queryParams: Params = { };
    this.router.navigate(['/pages/sources/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
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
  onNewSecurityRisk(event){
    this.windowService.open(
      CreateSecuritySourceComponent,
      {
        title: `Craete security risk for ${this.currentSource.name}`,
        hasBackdrop: false,
        closeOnEsc: true,
        context : {
          currentSource: JSON.parse(JSON.stringify(this.currentSource))
        },
      },
    );

  }
  onNewReliabilityRisk(event){
    this.windowService.open(
      CreateReliabilitySourceComponent,
      {
        title: `Craete reliability risk for ${this.currentSource.name}`,
        hasBackdrop: false,
        closeOnEsc: true,
        context : {
          currentSource: JSON.parse(JSON.stringify(this.currentSource))
        },
      },
    );
  }
  onNewSecurityRiskSave(event){

  }
}
