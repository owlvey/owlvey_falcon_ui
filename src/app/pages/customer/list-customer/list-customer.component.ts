import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService } from '@nebular/theme';
import { CustomerEventHub } from '../../../@core/hubs/customer.eventhub';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  settings = {
    mode: 'external',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      productsCount: {
        title: 'Services',
        type: 'number',
        filter: false,
        width: '3em',
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private activatedRoute: ActivatedRoute,
    private toastr: NbToastrService,
    private router: Router,    
    private customerEventHub: CustomerEventHub
  ) {
  }

  ngOnInit() {    
    this.getCustomers();
  }

  getCustomers() {
    this.customerGateway.getCustomers().subscribe(data => {
      this.source.load(data);
    });
  }

  deleteCustomer(item: any) {
    this.customerGateway.deleteCustomer(item.id)
      .subscribe((data) => {
        this.getCustomers();
      }, (error) => {
        this.toastr.danger('Something went wrong. Please try again.');
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteCustomer(event.data);
    } else {
      event.confirm.reject();
    }
  }

  onCreate(event) {
    const queryParams: Params = {};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/pages/customers/create'], extras);
  }
  onEdit(event) {
    this.router.navigate(['/pages/customers/' + event.data.id]);
  }
  onCustomerRowSelect(event) {
    const customerId = event.data.id;
    const queryParams: Params = { customerId: customerId };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/pages/customers/detail'], extras);
  }
}
