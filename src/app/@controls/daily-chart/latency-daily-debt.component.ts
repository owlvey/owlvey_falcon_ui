import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormatService } from '../../@core/utils/format.service';

@Component({
  selector: 'ngx-latency-daily-debt-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class LatencyDailyDebtChartComponent implements AfterViewInit, OnDestroy {

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
    


  @Input()
  set dataItems(data: Array<any>){
    const legends = [];
    const series = [];    
    data.forEach(serieData => {
        const line = serieData.items.map(
          c => {
            const value =  c['oAve'];            
            return { name: c.date, value: [this.formatService.extractDateStringFromUtc(c.date), value.toFixed(2)] };
          },
        );
        legends.push(serieData.name);
        const serie = {
          name : serieData.name,
          type : 'line',
          data: line,
          stack: 'debt',
          areaStyle: {},
          showSymbol: true,
          hoverAnimation: false,          
         };
         series.push(serie);
    });

    const legends_selected = {};
    legends.forEach(c => {      
      legends_selected[c] = true;      
    });

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.options = {
        grid: {
          top: '35',
          left: '5',
          right: '5',
          bottom: '5',
          containLabel: true,
        },        
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }                    
        },
        legend: {
          left: 'left',
          data: legends,
          selected: legends_selected,
          textStyle: { color: echarts.textColor },
        },
        xAxis: [
          {
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
          },
        ],
        yAxis: [
          {
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
        ],      
   
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
