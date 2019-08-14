
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';

const routes: Routes = [
  { path: '', component: ListCustomerComponent},
  { path: 'detail/:customerId', component: DetailCustomerComponent },
  { path: 'create', component: CreateCustomerComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
 
export const routedComponents = [
  ListCustomerComponent,
  DetailCustomerComponent,  
  CreateCustomerComponent
];
