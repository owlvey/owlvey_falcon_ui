import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer.routing.module';

@NgModule({
  declarations: [CreateCustomerComponent, ListCustomerComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
