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
import { DailyDebtChartComponent } from './daily-chart/daily-debt.component';
import { CalendarDebtChartComponent } from './daily-chart/calendar-debt.component';
import { LatencyDailyChartComponent } from './daily-chart/latency-daily-chart.component';
import { LatencyDailyCalendarChartComponent } from './daily-chart/latency-daily-calendar.component';
import { LatencyDailyDetailChartComponent } from './daily-chart/latency-daily-detail-chart.component copy';
import { LatencyDailyDebtChartComponent } from './daily-chart/latency-daily-debt.component';

@NgModule({
   imports: [FormsModule, CommonModule, Ng2SmartTableModule, NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule, NbCardModule],
   declarations: [LatencyDailyDebtChartComponent,LatencyDailyDetailChartComponent, LatencyDailyCalendarChartComponent, LatencyDailyChartComponent, DailyChartComponent, DailyDetailChartComponent, DailyCalendarChartComponent, DailyDebtChartComponent, CalendarDebtChartComponent ],
   exports: [LatencyDailyDebtChartComponent, LatencyDailyDetailChartComponent, LatencyDailyCalendarChartComponent, LatencyDailyChartComponent, DailyChartComponent, DailyDetailChartComponent, DailyCalendarChartComponent, DailyDebtChartComponent, CalendarDebtChartComponent],
})

export class ControlsModule {

}

