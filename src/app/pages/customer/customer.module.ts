import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { CustomerRoutingModule } from "./customer.routing.module";
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [DetailCustomerComponent, ListCustomerComponent],
  imports: [CommonModule, CustomerRoutingModule, Ng2SmartTableModule, NbCardModule]
})
export class CustomerModule { }
