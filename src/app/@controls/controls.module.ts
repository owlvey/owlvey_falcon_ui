import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';


import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { DailyDetailChartComponent } from './daily-chart/daily-detail-chart.component';
import { DailyCalendarChartComponent} from './daily-chart/daily-calendar.component';

@NgModule({
   imports: [FormsModule, CommonModule, Ng2SmartTableModule, NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule, NbCardModule],
   declarations: [ DailyChartComponent, DailyDetailChartComponent, DailyCalendarChartComponent ],
   exports: [DailyChartComponent, DailyDetailChartComponent, DailyCalendarChartComponent],
})

export class ControlsModule {

}

