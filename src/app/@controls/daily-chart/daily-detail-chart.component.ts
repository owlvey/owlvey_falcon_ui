import { AfterViewInit, Component, OnDestroy, Input, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormatService } from '../../@core/utils/format.service';



@Component({
  selector: 'ngx-daily-detail-chart',
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>
  `,
})
export class DailyDetailChartComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;
  
  constructor(private theme: NbThemeService,
    private formatService: FormatService) {
  }
  private _dataItems : Array<any>; 

  private formatDate(date){
    const target = new Date(date);
    return [target.getFullYear(), target.getMonth() + 1, target.getDate()].join('/');    
  }
  
  get dataItems(){
    return this._dataItems;
  }  
  echartsIntance: any;

  onChartInit(ec) {
    this.echartsIntance = ec;
  }  
  @Input()
  showAll: boolean = false;

  @Input()
  set dataItems(data: Array<any>){    
    let legends = [];
    let series = [];    
    let minValue = 50;
    data.forEach(serieData=>{      
        const line = serieData.items.map(
          c =>{ 
            if(c.oAva * 100 < minValue) {              
              minValue = c.oAval;
            }
            return { name: c.date, value:[this.formatDate(c.date), c.oAva * 100] };
          }
        );
        legends.push(serieData.name);
        let serie = {
          name : serieData.name, 
          type : 'line', 
          data: line, 
          showSymbol: true, 
          hoverAnimation: false,
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
         };
         series.push(serie);
    });    
    
    let legends_selected = {};
    legends.forEach(c=>{      
      if (this.showAll){
        legends_selected[c]= true;
      }      
      else{
        if (c !== "Availability"){
          legends_selected[c]= false;
        }
      }
    });

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
          data: legends,
          selected: legends_selected,
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
            min: minValue, 
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
              gt: 80,
              lte: 100,
              color: '#096'
          }, {
              gt: 60,
              lte: 80,
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
        series: series,
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
