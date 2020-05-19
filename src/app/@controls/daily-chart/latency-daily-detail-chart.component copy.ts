import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormatService } from '../../@core/utils/format.service';



@Component({
  selector: 'ngx-latency-daily-detail-chart',
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>
  `,
})
export class LatencyDailyDetailChartComponent implements AfterViewInit, OnDestroy {

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
  showAll: boolean = false;

  @Input()
  target: string = 'average';

  @Input()
  all: string = 'All';

  private _pieces: Array<any> = [
      { gt: 0, lte: 1000,  color: '#096',}, 
      { gt: 1000, lte: 2000,   color: '#ffde33',},
      { gt: 2000, lte: 5000,   color: '#ff9933',}, 
      { gt: 5000,  lte: 100000,   color: '#cc0033',}];

  get pieces(){
    return this._pieces;
  }

  @Input()
  set pieces(data: Array<any>){   
    this._pieces = data;
  }


  private getValue(item){        
    if (this.target == 'average'){
      return item['oAve'];
    }
    throw new Error('No valid option');
  }

  @Input()
  set dataItems(data: Array<any>){    
    const legends = [];
    const series = [];    
    let maxValue = -1;
    
    data.forEach(serieData => {
        const line = serieData.items.map(
          c => {
            const value = this.getValue(c);
            if (value > maxValue) {
              maxValue = c[this.target];
            }
            return { name: c.date, value: [this.formatService.extractDateStringFromUtc(c.date), value] };
          },
        );
        legends.push(serieData.name);
        const serie = {
          name : serieData.name,
          type : 'line',
          data: line,
          showSymbol: true,
          hoverAnimation: false,
          markLine: {
                 silent: true,
                 data: [{
                     yAxis: 20,
                 }, {
                     yAxis: 40,
                 }, {
                     yAxis: 80,
                 }, {
                     yAxis: 95,
                 }],
           },
         };
         series.push(serie);
    });

    const legends_selected = {};
    legends.forEach(c => {
      if (this.showAll){
        legends_selected[c] = true;
      }
      else{
        if (c !== this.all){
          legends_selected[c] = false;
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
            min: 0,
            max: maxValue,
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
          show: true,
          top: 0,
          right: 0,
          textStyle: {
            color: echarts.textColor,
          },
          pieces: this.pieces,
          outOfRange: {
              color: '#999',
          },
        },
        grid: {
          top: '25%',
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
