import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  currentCustomer = {};  
  customerId = 0;  

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
      servicesCount: {
        title: 'Portfolios',
        type: 'number',
        filter: false,
        width: '3em',
      },      
    },
  };
  public startDate : Date; 
  public endDate: Date;
  public productId: number;
  source: LocalDataSource = new LocalDataSource();  

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private router: Router, 
    private activatedRoute: ActivatedRoute) { 
    }        
  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                                  
      this.customerId = parseInt(paramMap.get('customerId'));  
      this.productId = parseInt(paramMap.get('productId'));  
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));                  
      this.getProduct();                 
    });     
  }

  getProduct(){    
    this.customerGateway.getCustomer(this.customerId).subscribe(data=>{
      this.currentCustomer = data;
    });
    this.productGateway.getProducts(this.customerId).subscribe(data=>{
      this.source.load(data);
    });
  }
  onProductRowSelect(event){
    const productId = event.data.id;
    let queryParams: Params = { productId: productId, uheader: null };
    this.router.navigate(['/pages/products/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

}