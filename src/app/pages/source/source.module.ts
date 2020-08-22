import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSourceComponent } from "./create-source/create-source.component";
import { ListSourceComponent } from './list-source/list-source.component';
import { TreeMapSourceComponent } from './treemap-source/treemap-source.component';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ItemsSourceComponent } from './items-source/items-source.component';


import { CreatePropItemsSourceComponent } from './create-prop-items-source/create-prop-items-source.component';
import { CreateIntItemsSourceComponent  } from './create-int-items-source/create-int-items-source.component';
import { CreateLatencyItemsSourceComponent  } from './create-latency-items-source/create-latency-items-source.component';


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
import { EditSourceComponent } from './edit-source/edit-source.component';
import { LatencyEditSourceComponent } from './latency-edit-source/latency-edit-source.component';


@NgModule({
  declarations: [CreateSourceComponent, CreateLatencyItemsSourceComponent,
    CreateIntItemsSourceComponent,
    LatencyEditSourceComponent,
    ItemsSourceComponent, CreatePropItemsSourceComponent,
    LatencyDetailSourceComponent,  LatencySourceItemsComponent,
    DetailSourceComponent, ListSourceComponent, EditSourceComponent,
    TreeMapSourceComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SourceRoutingModule, Ng2SmartTableModule,
     NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
     NbCardModule, ControlsModule, NbRadioModule, NbTooltipModule, NbIconModule, NbTabsetModule],
})
export class SourceModule { }


