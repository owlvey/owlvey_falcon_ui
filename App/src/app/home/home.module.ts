import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { GetStartedComponent } from './get-started/get-started.component';

@NgModule({
  declarations: [IndexComponent, GetStartedComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    //TourNgBootstrapModule
  ],
  exports: [
    IndexComponent,
    GetStartedComponent
    //TourNgBootstrapModule
  ]
})
export class HomeModule { }
