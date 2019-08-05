import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRegisterComponent } from './account-register/account-register.component';
import { AccountLoginComponent } from './account-login/account-login.component';

const routes: Routes = [
  { path: 'account/sign-in', component: AccountLoginComponent },
  { path: 'account/sign-up', component: AccountRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
