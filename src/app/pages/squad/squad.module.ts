import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSquadComponent } from './list-squad/list-squad.component';
import { DetailSquadComponent } from './detail-squad/detail-squad.component';
import { CreateSquadComponent } from './create-squad/create-squad.component';
import { SquadRoutingModule } from "./squad.routing.module";
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
import { EditSquadComponent } from './edit-squad/edit-squad.component';


@NgModule({
  declarations: [DetailSquadComponent, ListSquadComponent, CreateSquadComponent, EditSquadComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SquadRoutingModule, Ng2SmartTableModule, 
    NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
    NbCardModule, ControlsModule, NbCheckboxModule]
})
export class SquadModule { }
