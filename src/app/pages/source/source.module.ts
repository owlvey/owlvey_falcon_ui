import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSourceComponent } from "./create-source/create-source.component";
import { EditSourceComponent } from "./edit-source/edit-source.component";
import { ListSourceComponent } from './list-source/list-source.component';
import { TreeMapSourceComponent } from './treemap-source/treemap-source.component';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ItemsSourceComponent } from './items-source/items-source.component';
import { ProportionSourceComponent } from './proportion-source/proportion-source.component';
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
  NbTreeGridModule,  
} from '@nebular/theme';

@NgModule({
  declarations: [CreateSourceComponent, EditSourceComponent, DetailSourceComponent, ListSourceComponent, ItemsSourceComponent, 
    ProportionSourceComponent, TreeMapSourceComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SourceRoutingModule, Ng2SmartTableModule, 
     NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
     NbCardModule, ControlsModule, NbRadioModule, NbTooltipModule, NbIconModule],  
})
export class SourceModule { }


