import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-daily-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class DailyChartComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }
  private _dataItems : Array<any>; 

  private formatDate(date){
    const target = new Date(date);
    return [target.getFullYear(), target.getMonth() + 1, target.getDate()].join('/');    
  }
  
  get dataItems(){
    return this._dataItems;
  }  

  @Input()
  set dataItems(data: Array<any>){
    const line = data.map(c=>{ return { name: c.date, value:[ this.formatDate(c.date), 100 * c.oAva]}});
    const dates = data.map(c=> new Date(c.date));
    const points = [{
         name : "Availability", 
         type : 'line', 
         data: line, 
         showSymbol: true, 
         hoverAnimation: true,
         markLine: {
                silent: true,
                data: [{
                    yAxis: 20
                }, {
                    yAxis: 40
                }, {
                    yAxis: 60
                }, {
                    yAxis: 90
                }]
          },
        } 
      ];      
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.options = {
        backgroundColor: echarts.bg,      
        color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {c}',
        },
        legend: {
          left: 'left',
          data: ['Availability'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'time',            
            splitLine: {
              show: false
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
          },
        ],
        yAxis: [
          {
            type: 'value',
            min: 0, 
            max: 100,
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
        ],
        visualMap: {
          top: 1,
          right: 1,
          textStyle:{
            color: echarts.textColor
          },
          pieces: [{
              gt: 90,
              lte: 100,
              color: '#096'
          }, {
              gt: 60,
              lte: 90,
              color: '#ffde33'
          }, {
              gt: 40,
              lte: 60,
              color: '#ff9933'
          }, {
              gt: 0,
              lte: 40,
              color: '#cc0033'
          }],
          outOfRange: {
              color: '#999'
          }
        },
        grid: {
          left: '5%',
          right: '6%',
          bottom: '5%',
          containLabel: true,
        },
        series: points,
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
