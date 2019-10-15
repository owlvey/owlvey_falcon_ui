import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'app-list-sync',
  templateUrl: './list-sync.component.html',
  styleUrls: ['./list-sync.component.scss']
})
export class ListSyncComponent extends ProductBaseComponent {  
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      target: {
        title: 'Target',
        type: 'string',
        filter: false,        
      },
    },
  };  
  source: LocalDataSource = new LocalDataSource();

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
  }  
  
  onChangeQueryParameters(paramMap: ParamMap): void {           
    super.onChangeQueryParameters(paramMap);            
    this.getSyncs();
  }
  getSyncs(){
    this.productGateway.getSyncs(this.productId).subscribe(data=>{
      this.source.load(data);
    });    
  }

  onRowSelect(event){
    const pname = event.data.name;
    let queryParams: Params = { name: pname };
    this.router.navigate(['/pages/sync/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  onCreate(event) {
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/sync/create'], extras);
  }

}
