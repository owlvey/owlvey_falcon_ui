<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSourceComponent } from './create-source/create-source.component';
import { ListSourceComponent } from './list-source/list-source.component';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { SourceRoutingModule } from "./source.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DailyChartComponent } from '../controls/daily-chart/daily-chart.component';
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


@NgModule({
  declarations: [CreateSourceComponent, DetailSourceComponent, ListSourceComponent, DailyChartComponent],
  imports: [FormsModule, CommonModule, SourceRoutingModule, Ng2SmartTableModule, NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule, NbCardModule]
})
export class SourceModule { }



=======
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateSourceComponent } from "./create-source/create-source.component";
import { ListSourceComponent } from "./list-source/list-source.component";
import { SourceRoutingModule } from "./source.routing.module";
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [CreateSourceComponent, ListSourceComponent],
  imports: [
    CommonModule,
    SourceRoutingModule,
    Ng2SmartTableModule,
    NbCardModule
  ]
})
export class SourceModule {}
>>>>>>> 06135fc8b2059ae4ddb56b851e645ae5cccf2d3e
