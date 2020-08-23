import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListThreatComponent } from './list-threat/list-threat.component';
import { CreateSecurityThreatComponent } from './create-security-threat/create-threat.component';
import { DetailSecurityThreatComponent } from './detail-security-threat/detail-threat.component';



import { ThreatRoutingModule } from "./threat.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule  } from "./../../@controls/controls.module";

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
  declarations: [ListThreatComponent, CreateSecurityThreatComponent, DetailSecurityThreatComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ThreatRoutingModule, Ng2SmartTableModule, 
    NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
    NbCardModule, ControlsModule, NbCheckboxModule, NbIconModule, NbActionsModule]
})
export class ThreatModule { }
