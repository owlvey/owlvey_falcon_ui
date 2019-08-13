
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';

const routes: Routes = [
  { path: '', component: ListCustomerComponent},
  { path: ':customerId', component: DetailCustomerComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
 
export const routedComponents = [
  ListCustomerComponent,
  DetailCustomerComponent,  
];