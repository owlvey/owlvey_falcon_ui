import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
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
  startDate: Date = new Date();
  endDate: Date;  
  currentCustomer = {};  
  customerId = 0;
  series: Array<any> = [];  
  source: LocalDataSource = new LocalDataSource();
  target = "average";
  private _showAll: boolean = true;

  @Input()
  set showAll(event){
    this._showAll = !this._showAll;
       
  }
  get showAll(){
    return this._showAll;
  }
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
    },
  };
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,      
    private router: Router,
    private activatedRoute: ActivatedRoute) {       
    }        
  ngOnInit() {                  
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                              
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getCustomer();
      this.getDaily(); 
    });   
  }  
  getCustomer(){
    this.customerGateway.getCustomerWithAvailability(this.customerId, this.endDate).subscribe(data=>{
      this.currentCustomer = data;   
      this.source.load(data.products);
    });
  }
  getDaily(){
    this.customerGateway.getDaily(this.customerId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
    });
  }
  onBackClick(event){
    this.location.back();
  }
  onProductRowSelect(event){
    const productId = event.data.id;
    let queryParams: Params = { customerId: this.customerId, productId: productId, uheader: null };
    this.router.navigate(['/pages/products/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
}