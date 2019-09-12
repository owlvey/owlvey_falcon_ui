import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListMigrateComponent } from "./list-migrate/list-migrate.component";
import { MigrateRoutingModule } from "./migrate.routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlsModule } from "../../@controls/controls.module";

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

@NgModule({
  declarations: [    
    ListMigrateComponent,        
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MigrateRoutingModule,
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
export class MigrateModule {}
