import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHomeComponent } from './list-home/list-home.component';
import { HomeRoutingModule } from "./home.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ControlsModule  } from "./../../@controls/controls.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {    
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule
} from '@nebular/theme';


@NgModule({
  declarations: [ListHomeComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HomeRoutingModule, Ng2SmartTableModule, 
     NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
     NbIconModule, ControlsModule]
})
export class HomeModule { }


