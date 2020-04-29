import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormatService } from '../../@core/utils/format.service';



@Component({
  selector: 'ngx-daily-calendar-chart',
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>    
  `,
})
export class DailyCalendarChartComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService,
    private formatService: FormatService) {
  }

  private _dataItems: Array<any>;

  get dataItems(){
    return this._dataItems;
  }
  echartsIntance: any;

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  private _pieces: Array<any> = [
      { gt: 95,  lte: 100,  color: '#096',}, 
      { gt: 80,  lte: 95,   color: '#ffde33',},
      { gt: 40,  lte: 80,   color: '#ff9933',}, 
      { gt: 0,   lte: 40,   color: '#cc0033',}];

  get pieces(){
    return this._pieces;
  }

  @Input()
  set pieces(data: Array<any>){   
    this._pieces = data;
  }

  @Input()
  showAll: boolean = false;

  @Input()
  set dataItems(data: Array<any>){
    
    const formatService = this.formatService;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echartsColors: any = config.variables.echarts;
      

      this.options = {
        // title: {         
        //   top: 30,   
        //   left: 'center',
        //   text: 'Quality Calendar',
        //   textStyle: {
        //       color: echartsColors.textColor
        //   }
        // },
        tooltip: {
          formatter: function (params) {                          
              return params.value[0] +  ', value: ' + formatService.round2Decimals(params.value[1]);
          }
        },
        visualMap: {
          show: true,
          showLabel: true,            
          outOfRange: {
            color: '#999',
          },
          pieces: this.pieces,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          textStyle: {
            color: echartsColors.textColor
          },
          top: 65,
          min: 0,
          max: 100
      },
        calendar: {
            top: 120,
            range: String((new Date()).getFullYear()),
            textStyle: {
              color: echartsColors.textColor
            },       
            yearLabel: {                
              textStyle: {                    
                  color: echartsColors.textColor
              }
            },
            monthLabel:{
              color: echartsColors.textColor                
            },
            dayLabel: {                      
              color: echartsColors.textColor                
            },
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data,        
        }
      };
      
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
  }
}
