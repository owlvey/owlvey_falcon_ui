import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRiskComponent } from './list-risk/list-risk.component';
import { CreateSecurityRiskComponent } from './create-security-risk/create-risk.component';
import { DetailSecurityRiskComponent } from './detail-security-risk/detail-risk.component';

import { RiskRoutingModule } from "./risks.routing.module";
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
  declarations: [ListRiskComponent, CreateSecurityRiskComponent, DetailSecurityRiskComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RiskRoutingModule, Ng2SmartTableModule, 
    NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
    NbCardModule, ControlsModule, NbCheckboxModule, NbIconModule, NbActionsModule]
})
export class RiskModule { }
