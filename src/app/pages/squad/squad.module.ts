import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSquadComponent } from './list-squad/list-squad.component';
import { DetailSquadComponent } from './detail-squad/detail-squad.component';
import { CreateSquadComponent } from './create-squad/create-squad.component';
import { GraphSquadComponent } from './graph-squad/graph-squad.component';
import { CreateUserSquadComponent } from './create-user-squad/create-user-squad.component';
import { DetailUserSquadComponent } from './detail-user-squad/detail-user-squad.component';
import { VisModule } from 'ngx-vis'
import { SquadRoutingModule } from "./squad.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule  } from "./../../@controls/controls.module";
import { EditSquadComponent } from './edit-squad/edit-squad.component';
import { CreateProductSquadComponent } from './create-product-squad/create-product-squad.component';
import { DetailProductSquadComponent } from './detail-product-squad/detail-product-squad.component';

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
  declarations: [DetailSquadComponent, GraphSquadComponent, ListSquadComponent, CreateSquadComponent, EditSquadComponent, CreateUserSquadComponent, DetailUserSquadComponent, CreateProductSquadComponent, DetailProductSquadComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SquadRoutingModule, Ng2SmartTableModule, 
    NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
    NbCardModule, ControlsModule, NbCheckboxModule, VisModule, NbIconModule, NbActionsModule]
})
export class SquadModule { }
