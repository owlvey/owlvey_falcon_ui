import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFeatureComponent } from './list-feature/list-feature.component';
import { DetailFeatureComponent } from './detail-feature/detail-feature.component';
import { FeatureRoutingModule } from "./feature.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';
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
  declarations: [DetailFeatureComponent, ListFeatureComponent],
  imports: [FormsModule, FeatureRoutingModule, CommonModule,  Ng2SmartTableModule, NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule, NbCardModule, ControlsModule]
})
export class FeatureModule { }


