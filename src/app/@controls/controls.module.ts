import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';


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
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { DailyDetailChartComponent } from './daily-chart/daily-detail-chart.component';
import { throwIfAlreadyLoaded } from '../../../App/src/app/@core/module-import-guard';


@NgModule({
   imports: [FormsModule, CommonModule, Ng2SmartTableModule, NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule, NbCardModule],
   declarations: [ DailyChartComponent, DailyDetailChartComponent ],
   exports: [DailyChartComponent, DailyDetailChartComponent]
})

export class ControlsModule {
    
}

