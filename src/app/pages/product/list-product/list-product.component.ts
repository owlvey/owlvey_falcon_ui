import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  currentProduct = {};
  customerId = 0;
  productId = 0;

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
        filter: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private activatedRoute: ActivatedRoute) { 
      this.customerId = activatedRoute.snapshot.params.customerId;
      this.productId = activatedRoute.snapshot.params.productId;
      this.customerGateway = customerGateway;
    }        
  ngOnInit() {    
     this.getCustomer(this.customerId);
     this.getProduct(this.productId);
  }

  getProduct(productId: number){
    this.productGateway.getProduct(productId).subscribe(data=>{
      this.currentProduct = data;
      this.sourcesGateway.getSources(productId).subscribe(sources=>{
        this.source.load(sources);
      });
    });     
  }
  getCustomer(customerId: number){
    this.customerGateway.getCustomer(customerId).subscribe(data=>{
      this.currentCustomer = data;      
    });
  }

}