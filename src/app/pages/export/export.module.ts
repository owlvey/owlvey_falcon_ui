import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExportRoutingModule } from "./export.routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,  
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule
} from "@nebular/theme";
import { ListExportComponent } from './list-export/list-export.component';
import { ControlsModule } from '../../@controls/controls.module';

@NgModule({
  declarations: [    
    ListExportComponent,        
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ExportRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NgxEchartsModule,
    ChartModule,
    NbDatepickerModule,
    NgxChartsModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    ControlsModule,
    NbCheckboxModule,
    NbIconModule
  ]
})
export class ExportModule {}
