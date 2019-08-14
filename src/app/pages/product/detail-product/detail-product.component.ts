import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  currentCustomer = {};  
  currentProduct ={};
  productId: number;
  customerId: number;
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,    
    private activatedRoute: ActivatedRoute) {       
    }        
  ngOnInit() {         
     this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {      
      const refresh = paramMap.get('refresh');      
      this.productId = parseInt(paramMap.get('productId'));         
      this.customerId = parseInt(paramMap.get('customerId'));         
      this.getProduct(this.customerId, this.productId);              
    });
  }  
  getProduct(customerId: number, productId: number){    
    this.customerGateway.getCustomer(customerId).subscribe(data=>{
      this.currentCustomer = data;      
    });
    this.productGateway.getProduct(productId).subscribe(data=>{
      this.currentProduct = data;
    });
  }
}