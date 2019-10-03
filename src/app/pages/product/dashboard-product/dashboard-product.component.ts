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
  squads: any[];
  squadsData: any[];
  sourceData: any[];
  incident: any;
  services: any[];
  features: any[];
  featuresData: any[];
  serviceMaps: any;
  featureMaps: any;
  incidentMaps: any;
  squadMaps: any;

  sourceTotal: number;
  sourceStats: any;
  serviceStats: any;    
  featuresStats: any; 
  sloFails: number = 0;

  
  option: any = {};
  optionServices: any = {};
  optionFeatures: any = {};
  optionSLO: any = {};
  optionSources: any = {};


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
        this.sourceData = data.sources;
        this.featuresData = data.features;
        this.squadsData = data.squads;
        this.serviceMaps = data.serviceMaps;
        this.featureMaps = data.featureMaps;
        this.incidentMaps = data.incidentInformation;
        this.squadMaps = data.squadMaps;
        this.services = data.services.map(c=> { 
          c.title =  `SLO: ${c.slo} | Availability: ${c.availability}`
          return c;
         } );
        this.sourceTotal = data.sourceTotal;
        this.sourceStats = data.sourceStats; 
        this.serviceStats = data.servicesStats;
        this.featuresStats = data.featuresStats;     
        this.sloFails = data.sloFail;   
        const sourceAvailability = parseFloat(data.sourceStats.mean) * 100;
        const serviceAvailability = parseFloat(data.servicesStats.mean) * 100;        
        const featureAvailability = parseFloat(data.featuresStats.mean) * 100;
        const sloProportion = parseFloat(data.sloProportion) * 100;
        this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
          const solarTheme: any = config.variables.solar;  
          this.option = this.buildOptions(solarTheme, config, sourceAvailability);
          this.optionServices = this.buildOptions(solarTheme, config, serviceAvailability);
          this.optionFeatures = this.buildOptions(solarTheme, config, featureAvailability);
          this.optionSLO = this.buildOptions(solarTheme, config, sloProportion);
          this.optionSources = this.buildOptions(solarTheme, config, sourceAvailability);
        });
      });
    }

    onSourceClick(event){      
      alert(event);
    }
    onServiceClick(event){
      const serviceId = event.currentTarget.id;
      const featuresIds = this.serviceMaps[serviceId];
      this.features = this.featuresData
        .filter(c=> featuresIds.indexOf(c.id) > -1 )
        .sort(( a:any, b:any)=>{
          return a.id - b.id;
        });
      this.sources = [];
      this.squads = [];
    }
    onFeatureClick(event){
      const featureId = event.currentTarget.id;
      const indicatorsIds = this.featureMaps[featureId];
      const squadsIds = this.squadMaps[featureId];
      this.incident = this.incidentMaps[featureId];
      this.sources = this.sourceData.filter(c=> indicatorsIds.indexOf(c.id) > -1 );
      this.squads = this.squadsData.filter(c=> squadsIds.indexOf(c.id)> -1);
    }
    ngOnDestroy() {
      if (this.themeSubscription){
        this.themeSubscription.unsubscribe();
      }      
    }
}
