
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DashboardCustomerComponent } from "./dashboard-customer/dashboard-customer.component";

const routes: Routes = [
  { path: '', component: ListCustomerComponent},
  { path: 'detail', component: DetailCustomerComponent },
  { path: 'edit', component: EditCustomerComponent },
  { path: 'create', component: CreateCustomerComponent },
  { path: 'dashboard', component: DashboardCustomerComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
 
export const routedComponents = [
  ListCustomerComponent,
  DetailCustomerComponent,  
  CreateCustomerComponent,
  DashboardCustomerComponent,
];
