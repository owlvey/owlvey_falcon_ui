import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { NbThemeService } from '@nebular/theme';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';



@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent  extends CustomerBaseComponent  implements OnInit, AfterViewInit {
  public currentProduct : any = {};
  public productId : number;     
  sources: any[];  
  currentSource : any= {};            
  options: any = {};
  series: Array<any> = [];  
  source: LocalDataSource = new LocalDataSource();

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
      slo: {
        title: 'SLO',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },          
      featuresCount: {
        title: 'Features',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },    
    },
  };
  
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected sourcesGateway: SourcesGateway,    
    protected featuresGateway: FeaturesGateway,    
    protected portfolioGateway: PortfoliosGateway,    
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, theme, router, activatedRoute);
    }        
   
  onChangeQueryParameters(paramMap: ParamMap): void {    
    this.productId = parseInt(paramMap.get('productId'));                                
    super.onChangeQueryParameters(paramMap); 
    this.loadProduct();

  }

  public loadProduct(){    
      this.productGateway.getProduct(this.productId).subscribe(data=>{
          this.currentProduct = data;
          this.source.load(data.services);
      });       
  }
  onNgOnInit(): void {
    
  }
  
  
  onServiceRowSelect(event){
      const portfolioId = event.data.id;
      let queryParams: Params = { portfolioId: portfolioId, productId: null };      
      this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  } 

  onReportClick(event){
    
  }
  
  ngAfterViewInit() {    
    
  }
}