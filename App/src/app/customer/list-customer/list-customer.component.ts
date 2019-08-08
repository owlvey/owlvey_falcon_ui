import { Component, OnInit, ViewChildren } from '@angular/core';
import { EventHandlerService } from './../../event-handler.service';
import { CustomerService } from '../customer.service';
import { ConfirmDeleteDirective } from './../../../directives/confirm-delete.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
  providers: [CustomerService]
})
export class ListCustomerComponent implements OnInit {
  @ViewChildren(ConfirmDeleteDirective) deleteDirective;
  isLoading: boolean = false;
  customers: any[];
  actionConfirmWord: string;

  constructor(
    private eventHandler: EventHandlerService,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {
    this.eventHandler.event.subscribe((event: any) => {
      if (event && event.name === 'reloadCustomers') {
        this.getCustomers();
      }
    });
    this.actionConfirmWord = "delete";
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.isLoading = true;
    this.customerService.getCustomers()
      .subscribe((data: any[]) => {
        console.log(data);
        this.customers = data;
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      })
  }

  editCustomer(item: any) {
    this.eventHandler.event.next({
      name: 'createCustomer',
      data: item
    })
  }

  deleteCustomer(item: any) {
    console.log("Deleting", item);
    this.customerService.deleteCustomer(item.id)
      .subscribe((data) => {
        this.deleteDirective.first.closeModal();
        this.getCustomers();
      }, (error) => {
        this.deleteDirective.first.closeModal();
        this.toastr.error("Something went wrong. Please try again.");
      })
  }

  openCreateModal() {
    console.log("asdas")
    this.eventHandler.event.next({
      name: 'createCustomer'
    })
  }
}
