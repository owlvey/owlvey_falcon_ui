import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/auth/auth-guard.service';
import { ListCustomerComponent } from './list-customer/list-customer.component';

const routes: Routes = [
  { path: 'customer', component: ListCustomerComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
