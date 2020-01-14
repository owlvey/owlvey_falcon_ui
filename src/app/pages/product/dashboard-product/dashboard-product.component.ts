import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent extends ProductBaseComponent implements AfterViewInit, OnDestroy {


  productSunOptions:any;
  echartInstance: any;
  themeSubscription: any;

  textStatusClass = true;

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

    dashboardData: any;
    serviceGroups: any[];

    getDashboard(){
      this.productGateway.getProductServiceGroupDashboard(this.productId, this.startDate, this.endDate).subscribe(data=>{
        this.dashboardData = data;
        this.serviceGroups = data.groups.map(c => {           
            c.percentage = Math.round(c.proportion * 100);
            if ( c.proportion === 1){
                c.status = 'success';
                c.textStatusClass = 'text-success'
            }
            else if ( c.proportion > 0 ) {
                c.status = 'warning';
                c.textStatusClass = 'text-warning'
            }
            else {
                if (c.percentage === 0){
                  c.percentage = 0;
                }
                c.status = 'danger';
                c.textStatusClass = 'text-danger'
            }
            
            return c;
        });
      });
    }

    onServiceGroupDetail(event){
        const group = event.currentTarget.id;
        let queryParams: Params = { group: group};
        this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }

    onFeaturesDetail(event){
      let queryParams: Params = { };
      this.router.navigate(['/pages/features'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }

    onSourcesDetail(event){
      let queryParams: Params = { };
      this.router.navigate(['/pages/sources'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }

    ngOnDestroy() {
      if (this.themeSubscription){
        this.themeSubscription.unsubscribe();
      }
    }
}
