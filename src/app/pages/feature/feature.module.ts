import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListFeatureComponent } from "./list-feature/list-feature.component";
import { DetailFeatureComponent } from "./detail-feature/detail-feature.component";
import { CreateFeatureComponent } from "./create-feature/create-feature.component";
import { EditFeatureComponent } from "./edit-feature/edit-feature.component";
import { FeatureRoutingModule } from "./feature.routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlsModule } from "./../../@controls/controls.module";

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
    DetailFeatureComponent,
    ListFeatureComponent,
    CreateFeatureComponent,
    EditFeatureComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FeatureRoutingModule,
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
export class FeatureModule {}
