import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';

@Component({
  selector: 'app-list-feature',
  templateUrl: './list-feature.component.html',
  styleUrls: ['./list-feature.component.scss']
})
export class ListFeatureComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;  
  currentProduct = {};  
  productId = 0;
  customerId = 0;

  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 20
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true,        
        editable: false
      },      
      indicatorsCount: {
        title: 'SLIs',
        type: 'numver',
        filter: true,
        width: '3em',
        editable: false
      },      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,    
    private featureGateway: FeaturesGateway,    
    private router: Router, 
    private activatedRoute: ActivatedRoute) { 
      
    }        
  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.getFeature();
    });          
  }

  getFeature(){
    this.productGateway.getProduct(this.productId).subscribe(data=>{
      this.currentProduct = data;
    });
    this.featureGateway.getFeatures(this.productId).subscribe(data=>{
      this.source.load(data);
    });    
  }

  onUserRowSelect(event): void {            
    const featureId = event.data.id;
    let queryParams: Params = { featureId: featureId };
    this.router.navigate(['/pages/features/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

}