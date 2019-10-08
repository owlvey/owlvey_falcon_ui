import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  startDate: Date = new Date();
  endDate: Date;
  currentCustomer: any;
  customerId = 0;  
  source: LocalDataSource = new LocalDataSource();    
  
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      perPage: 20,
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false,
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
        editable: false,
      },
    },
  };
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private toastr: NbToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = parseInt(paramMap.get('customerId'));
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));
      this.getCustomer();      
    });
  }
  getCustomer(){
    this.customerGateway.getCustomerWithAvailability(this.customerId, this.startDate, this.endDate).subscribe(data => {
      this.currentCustomer = data;
      this.source.load(data.products);
    });
  }  
  onBackClick(event){
    this.location.back();
  }
  onProductRowSelect(event){
    const productId = event.data.id;
    const queryParams: Params = { customerId: this.customerId, productId: productId, uheader: null };
    this.router.navigate(['/pages/products/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onEditClick(event) {
    const queryParams: Params = {  };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/pages/customers/edit'], extras);
  }
  deleteCustomer() {
    this.customerGateway.deleteCustomer(this.customerId)
      .subscribe((data) => {
        this.location.back();
      }, (error) => {
        this.toastr.danger('Something went wrong. Please try again.', 'Error');
      });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteCustomer();
    } else {
      event.confirm.reject();
    }
  }
}
