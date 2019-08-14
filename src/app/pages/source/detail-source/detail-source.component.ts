import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'app-detail-source',
  templateUrl: './detail-source.component.html',
  styleUrls: ['./detail-source.component.scss']
})
export class DetailSourceComponent implements OnInit, AfterViewInit, OnDestroy {
  

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentSource : any= {};  
  customerId = 0;
  productId = 0;
  sourceId = 0;
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];
  startDate: Date = new Date();
  endDate: Date;
  period: number = 1;
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private theme: NbThemeService,
    private activatedRoute: ActivatedRoute) {       
      this.endDate = new Date();
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 365);
    }        

  ngOnInit() {         
    this.customerId = this.activatedRoute.snapshot.params.customerId;
    this.productId = this.activatedRoute.snapshot.params.productId;
    this.sourceId = this.activatedRoute.snapshot.params.sourceId;    
    this.getSource();
  }  

  getSource(){
    this.sourcesGateway.getSource(this.sourceId).subscribe(data=>{
      this.currentSource = data;            
    });    
  }

  handleClick(event){        
    this.sourcesGateway.getDaily(this.sourceId, this.startDate, this.endDate, this.period).subscribe(data=>{      
      this.changeOptions(data);
    });
  }

  ngOnDestroy(): void {
    
  }   
  formatDate(date){
    const target = new Date(date);
    return [target.getFullYear(), target.getMonth() + 1, target.getDate()].join('/');
    
  }

  changeOptions(data){
    const line = data.items.map(c=>{ return { name: c.date, value:[ this.formatDate(c.date), 100 * c.availability]}});
    const dates = data.items.map(c=> new Date(c.date));
    const points = [{
         name : "source", 
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
                    yAxis: 80
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
          data: ['source'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'time',            
            splitLine: {
              show: false
            }           
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
        series: points,
      };  
    });   
  }
  ngAfterViewInit() {
    
    
  }
}