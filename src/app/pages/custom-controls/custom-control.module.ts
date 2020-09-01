import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskCalculatorControlComponent } from './risk-calculator/risk-calculator.component';
import { ReliabilityCalculatorControlComponent } from './reliability-calculator/reliability-calculator.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
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
  NbTreeGridModule,
  NbTabsetModule,

  NbAlertModule,
} from '@nebular/theme';

@NgModule({
  declarations: [RiskCalculatorControlComponent, ReliabilityCalculatorControlComponent],
  imports: [FormsModule,
    ReactiveFormsModule, CommonModule, Ng2SmartTableModule,
    NbCardModule,
    NgxEchartsModule,
    ChartModule,
    NbDatepickerModule,
    NgxChartsModule,
    NbRadioModule,
    NbButtonModule,
    NbTabsetModule,
    NbAlertModule,
    NbSelectModule,
    NbCardModule],
  exports: [RiskCalculatorControlComponent, ReliabilityCalculatorControlComponent],
})
export class CustomControlsModule { }
