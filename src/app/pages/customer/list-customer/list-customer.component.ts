import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

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
        filter: true,
        width: '3em',
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
    }        
  ngOnInit() {    
     this.getCustomers();
  }
  getCustomers(){
    this.customerGateway.getCustomers().subscribe(data=>{
      this.source.load(data);
    });
  }
  onUserRowSelect(event): void {
    let customerId = event.data.id;
    this.router.navigate([`/pages/customers/${customerId}`], {
      queryParams: {refresh: new Date().getTime()}
    });        
  }
}