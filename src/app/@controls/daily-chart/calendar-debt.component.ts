import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormatService } from '../../@core/utils/format.service';



@Component({
  selector: 'ngx-calendar-debt-chart',
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>    
  `,
})
export class CalendarDebtChartComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService,
    private formatService: FormatService) {
  }

  

  
  echartsIntance: any;

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  get dataItems(){    
    return this._dataItems;
  }  
  //#region dataitems
  private _dataItems: Array<any>;
  @Input()
  set dataItems(data: Array<any>){
    
    if(!data) return;
    if(!data.length) return;
    if(!data[0].items.length) return;

    const len_data = data[0].items.length;
    let state = Array(len_data).fill(0);
    
    for (let index = 0; index < len_data; index++) {
      data.forEach(serieData => {
        state[index] +=  serieData.items[index].oAve * 100;      
      });
    }
    const max_error =  Math.max(...state);
    const pieces =  [
      { gte: 0,  lte: 0,  color: '#096',}, 
      { gt: 0,  lte: max_error / 3,   color: '#ffde33',},
      { gt: max_error / 3,  lte: 2 * (max_error / 3),   color: '#ff9933',}, 
      { gt: 2 * (max_error / 3),   lte: max_error,   color: '#cc0033',}
    ]
    let new_data = Array(len_data).fill(0);
    for (let index = 0; index < len_data; index++) {
      new_data[index] = 
        [ 
          this.formatService.extractDateStringFromUtc(data[0].items[index].date),          
          state[index]
        ];      
    }

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
            color: '#096',
          },
          pieces: pieces,          
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
            data: new_data,        
        }
      };
      
    });
  }
  //#endregion
  

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
  }
}
