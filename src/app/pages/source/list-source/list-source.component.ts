import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';

@Component({
  selector: 'app-list-source',
  templateUrl: './list-source.component.html',
  styleUrls: ['./list-source.component.scss']
})
export class ListSourceComponent implements OnInit {

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
        filter: true
      },      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private router: Router, 
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
  onUserRowSelect(event): void {    
    let sourceId = event.data.id;
    this.router.navigate([`/pages/customers/${this.customerId}/products/${this.productId}/sources/${sourceId}`], {
      queryParams: {refresh: new Date().getTime()}
    });        
  }

}