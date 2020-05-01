import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListserviceGroupComponent } from "./list-serviceGroup/list-serviceGroup.component";
import { AnnualServiceGroupComponent } from "./annual-serviceGroup/annual-serviceGroup.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlsModule } from "./../../@controls/controls.module";
import { ServiceGroupRoutingModule } from "./serviceGroup.routing.module";

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
  NbTreeGridModule,
  NbTabsetModule,
} from "@nebular/theme";

@NgModule({
  declarations: [
    ListserviceGroupComponent,
    AnnualServiceGroupComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServiceGroupRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTabsetModule,
    NgxEchartsModule,
    ChartModule,
    NbDatepickerModule,
    NgxChartsModule,
    NbButtonModule,
    NbCardModule,
    ControlsModule
  ]
})
export class ServiceGroupModule {}
