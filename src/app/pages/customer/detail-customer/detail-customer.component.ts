import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  currentCustomer = {};  
  customerId = 0;
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private activatedRoute: ActivatedRoute) {       
    }        
  ngOnInit() {         
     this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {      
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.getCustomer(this.activatedRoute.snapshot.params.customerId);     
      }
    });
  }  
  getCustomer(customerId: number){
    this.customerGateway.getCustomer(customerId).subscribe(data=>{
      this.currentCustomer = data;      
    });
  }

}