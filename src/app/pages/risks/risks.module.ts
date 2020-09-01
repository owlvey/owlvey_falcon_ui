import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRiskComponent } from './list-risk/list-risk.component';
import { EditSecurityRiskComponent } from './edit-security-risk/edit-risk.component';
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
  NbTreeGridModule,
  NbTabsetModule,
  NbAlertModule,
  NbStepperModule,
  NbRouteTabsetModule,
} from '@nebular/theme';
import { CustomControlsModule } from '../custom-controls/custom-control.module';
import { CreateSecuritySourceComponent } from './create-security-risk/create-security-source.component';
import { RiskCalculatorControlComponent } from '../custom-controls/risk-calculator/risk-calculator.component';
import { CreateReliabilitySourceComponent } from './create-reliability-risk/create-reliability-source.component';
import { ReliabilityCalculatorControlComponent } from '../custom-controls/reliability-calculator/reliability-calculator.component';
import { DetailReliabilityRiskComponent } from './detail-reliability-risk/detail-reliability-source.component';
import { EditReliabilityRiskComponent } from './edit-reliability-risk/edit-risk.component';


@NgModule({
  declarations: [
    ListRiskComponent,
    EditSecurityRiskComponent,
    DetailSecurityRiskComponent,
    CreateSecuritySourceComponent,
    CreateReliabilitySourceComponent,
    DetailReliabilityRiskComponent,
    EditReliabilityRiskComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RiskRoutingModule, Ng2SmartTableModule,
    NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
    NbCardModule, ControlsModule, NbCheckboxModule, NbIconModule,
    NbActionsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    CustomControlsModule],
  entryComponents: [
    CreateSecuritySourceComponent, RiskCalculatorControlComponent,
    CreateReliabilitySourceComponent, ReliabilityCalculatorControlComponent
  ]
})
export class RiskModule { }
