import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomerEventHub } from '../../../@core/hubs/customer.eventhub';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { BaseComponent } from '../../common/components/base-component';
import { delay, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardCustomerComponent extends BaseComponent implements OnDestroy {

  constructor(
    protected location: Location,
    protected theme: NbThemeService,
    protected customerGateway: CustomersGateway,
    protected router: Router,
    protected activatedRoute: ActivatedRoute) {
      super(location, theme, router, activatedRoute);
  }

  options: any[] = [];
  segments: any[] = [];
  effectiveness : number = 0;
  products: any[] = [];

  echartInstances: any[] = [];

  onChartInit(ec) {
    this.echartInstances.push(ec);
  }

  private alive = true;
  ngOnDestroy() {
    this.alive = false;
  }


  onNgOnInit(): void {

  }

  loadCustomers(){

  }

  onChangeQueryParameters(paramMap: import("@angular/router").ParamMap): void {
    this.theme.getJsTheme().subscribe(config=>{
      const earningLineTheme: any = config.variables.earningLine;
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      //color: [colors.danger, colors.primary, colors.info],

      this.customerGateway.getCustomerDashboard(this.startDate, this.endDate).subscribe(data=>{
        
        this.effectiveness = data.effectiveness;
        this.segments = data.categories;
        this.products = data.products.map(c=>{

          if (c.effectiveness < 1){
            c.textClass = "text-danger";
          }
          else {
            c.textClass = "text-success";
          }

          const targetData = c.groups.map(d => {
            const temp = {
                value: [ d.index, d.count],
                tags: d.tags,
                title: d.title,
                itemStyle: {
                  normal: {
                    color: colors[d.status]
                  },
                },
            };
            return temp;
          });

          c.options = {
            tooltip: {
                position: 'bottom',
                formatter: function (params) {
                  let message =  'Group: ' + params.name + ' ' + params.data.title + " <br/>";

                  params.data.tags.forEach(item => {
                    message += item + " <br/>"
                  });

                  return message;
                }
            },
            title: [],
            singleAxis: [
              {
                left: 150,
                type: 'category',
                boundaryGap: false,
                data: this.segments,
                top: (2 * 100 / 7 + 5) + '%',
                height: (100 / 7 - 10) + '%',
              }
            ],
            series: [
              {
                name: '',
                singleAxisIndex: 0,
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: targetData,
                symbolSize: function (dataItem) {
                    return dataItem[1] * 10;
                },
              }
            ]
          };
          return c;
        });
      });



    });

  }


}
