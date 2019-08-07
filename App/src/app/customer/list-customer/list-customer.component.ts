import { Component, OnInit } from '@angular/core';
import { EventHandlerService } from './../../event-handler.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  constructor(
    private eventHandler: EventHandlerService
  ) { }

  ngOnInit() {
  }

  openCreateModal() {
    console.log("asdas")
    this.eventHandler.event.next({
      name: 'createCustomer'
    })
  }
}
