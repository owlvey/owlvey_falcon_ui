import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSourceComponent } from "./create-source/create-source.component";
import { ListSourceComponent } from './list-source/list-source.component';
import { TreeMapSourceComponent } from './treemap-source/treemap-source.component';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { AvaIntDetailSourceComponent } from './ava-int-detail-source/ava-int-detail-source.component';
import { AvaIntItemsSourceComponent } from './ava-int-items-source/ava-int-items-source.component';

import { AvaPropDetailSourceComponent } from './ava-prop-detail-source/ava-prop-detail-source.component';
import { AvaPropItemsSourceComponent } from './ava-prop-items-source/ava-prop-items-source.component';

import { ExpIntItemsSourceComponent } from './exp-int-items-source/exp-int-items-source.component';
import { ExpPropItemsSourceComponent } from './exp-prop-items-source/exp-prop-items-source.component';
import { ExpIntDetailSourceComponent } from './exp-int-detail-source/exp-int-detail-source.component';
import { ExpPropDetailSourceComponent } from './exp-prop-detail-source/exp-prop-detail-source.component';
import { LatencyDetailSourceComponent } from './latency-detail-source/latency-detail-source.component';
import { SourceRoutingModule } from "./source.routing.module";
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
  NbTooltipModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTabsetModule,
  NbTreeGridModule,  
} from '@nebular/theme';
import { LatencySourceItemsComponent } from './latency-items-source/latency-items-source.component';
import { AvaEditSourceComponent } from './ava-edit-source/ava-edit-source.component';
import { ExpEditSourceComponent } from './exp-edit-source/exp-edit-source.component';
import { LatencyEditSourceComponent } from './latency-edit-source/latency-edit-source.component';


@NgModule({
  declarations: [CreateSourceComponent,  ExpEditSourceComponent,
    AvaIntDetailSourceComponent, AvaPropDetailSourceComponent,
    LatencyEditSourceComponent,
    AvaIntItemsSourceComponent, AvaPropItemsSourceComponent,
    ExpIntDetailSourceComponent, ExpPropDetailSourceComponent,
    ExpIntItemsSourceComponent, ExpPropItemsSourceComponent,
    LatencyDetailSourceComponent,  LatencySourceItemsComponent,  
    DetailSourceComponent, ListSourceComponent, AvaEditSourceComponent,
    TreeMapSourceComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SourceRoutingModule, Ng2SmartTableModule, 
     NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
     NbCardModule, ControlsModule, NbRadioModule, NbTooltipModule, NbIconModule, NbTabsetModule],  
})
export class SourceModule { }


