import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';

import { AccountRegisterComponent } from './account-register/account-register.component';
import { AccountLoginComponent } from './account-login/account-login.component';

@NgModule({
  declarations: [AccountRegisterComponent, AccountLoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountModule { }
