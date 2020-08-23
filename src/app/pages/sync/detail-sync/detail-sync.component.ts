import { Component, OnInit, ViewChildren, AfterViewInit, Input, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { JourneysGateway } from '../../../@core/data/portfolios.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { VisEdges, VisNetworkData, VisNetworkOptions,  VisNetworkService,  VisNode,  VisNodes, VisNodeOptions } from 'ngx-vis'
import { NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-detail-sync',
  templateUrl: './detail-sync.component.html',
  styleUrls: ['./detail-sync.component.scss']
})
export class DetailSyncComponent  extends ProductBaseComponent{
  isLoading: boolean = false;
  source: any;
  name: string;

  constructor(
    protected location: Location,
    private toastr: NbToastrService,
    protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected sourcesGateway: SourcesGateway,
    protected featuresGateway: FeaturesGateway,
    protected portfolioGateway: JourneysGateway,
    protected theme: NbThemeService,
    protected router: Router,
    protected visNetworkService: VisNetworkService,
    protected activatedRoute: ActivatedRoute) {
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }

  onChangeQueryParameters(paramMap: ParamMap): void {
    this.name = paramMap.get('name');
    super.onChangeQueryParameters(paramMap);
    this.loadSync();
  }

  public loadSync(){
      this.productGateway.getSync(this.productId, this.name).subscribe(data=>{
          this.source = data;
      });
  }

  onEditClick(event){
    let queryParams: Params = {  };
    this.router.navigate(['/pages/sync/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  onDeleteClick(event){
    if ( confirm("Are you sure?") ===  true){
       this.productGateway.deleteSync(this.productId, this.name).subscribe(data=>{
          this.toastr.success("Portfolio was deleted");
          let queryParams: Params = { name : null };
          this.router.navigate(['/pages/sync'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
       }, error =>{
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
       })
    }
  }

}
