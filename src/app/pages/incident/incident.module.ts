import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIncidentComponent } from './list-incident/list-incident.component';
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { DetailIncidentComponent } from './detail-incident/detail-incident.component';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';
import { IncidentRoutingModule } from "./incident.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ControlsModule  } from "../../@controls/controls.module";
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
  declarations: [ ListIncidentComponent, CreateIncidentComponent, EditIncidentComponent, DetailIncidentComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, IncidentRoutingModule, Ng2SmartTableModule, 
    NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
    NbCardModule, ControlsModule]
})
export class IncidentModule { }


