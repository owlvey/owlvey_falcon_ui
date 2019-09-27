import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent extends ProductBaseComponent implements AfterViewInit, OnDestroy {
  

  sources: any[];
  sourceCount: number;
  sourceStats: any;
  serviceStats: any;    
  featuresStats: any; 
  
  option: any = {};
  optionServices: any = {};
  optionFeatures: any = {};


  themeSubscription: any;

  constructor(    
    protected location: Location,
    protected customerGateway: CustomersGateway,            
    protected productGateway: ProductsGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }   

    ngAfterViewInit(): void {
      
    }

    onChangeQueryParameters(paramMap: ParamMap): void {                 
      super.onChangeQueryParameters(paramMap);        
      this.getDashboard();      
    }

    buildOptions(solarTheme, config, targetAvailability){
      return Object.assign({}, {            
        series: [
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: targetAvailability,
                name: ' ',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{d}%',
                    textStyle: {
                      fontSize: '22',
                      fontFamily: config.variables.fontSecondary,
                      fontWeight: '600',
                      color: config.variables.fgHeading,
                    },
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - targetAvailability,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: solarTheme.secondSeriesFill,
                  },
                },
              },
            ],
          },
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: targetAvailability,
                name: ' ',
                label: {
                  normal: {
                    position: 'inner',
                    show: false,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 7,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 28,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: 'none',
                  },
                },
              },
            ],
          },
        ],
      });
    }

    getDashboard(){
      this.productGateway.getProductDashboard(this.productId, this.startDate, this.endDate).subscribe(data=>{
        this.sources = data.sources;
        this.sourceCount = data.sourceStats.count;
        this.sourceStats = data.sourceStats; 
        this.serviceStats = data.servicesStats;
        this.featuresStats = data.featuresStats;
        const sourceAvailability = parseFloat(data.sourceStats.mean) * 100;
        const serviceAvailability = parseFloat(data.servicesStats.mean) * 100;        
        const featureAvailability = parseFloat(data.featuresStats.mean) * 100;
        this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
          const solarTheme: any = config.variables.solar;  
          this.option = this.buildOptions(solarTheme, config, sourceAvailability);
          this.optionServices = this.buildOptions(solarTheme, config, serviceAvailability);
          this.optionFeatures = this.buildOptions(solarTheme, config, featureAvailability);
        });
      });
    }

    onSourceClick(event){
      debugger;
      alert(event);
    }
    ngOnDestroy() {
      if (this.themeSubscription){
        this.themeSubscription.unsubscribe();
      }      
    }
}
