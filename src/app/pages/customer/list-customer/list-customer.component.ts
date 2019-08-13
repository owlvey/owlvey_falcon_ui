import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  settings = {
    mode: 'external',
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true
      },
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
    private router: Router
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
        this.toastr.danger("Something went wrong. Please try again.");
      })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      //event.confirm.resolve();
      this.deleteCustomer(event.data)
    } else {
      event.confirm.reject();
    }
  }

  onEdit(event) {
    console.log(event)
    this.router.navigate(['/pages/customers/' + event.data.id]);
  }
}
