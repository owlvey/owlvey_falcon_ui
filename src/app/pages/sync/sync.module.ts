import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListSyncComponent } from "./list-sync/list-sync.component";
import { CreateSyncComponent } from "./create-sync/create-sync.component";
import { DetailSyncComponent } from "./detail-sync/detail-sync.component";
import { EditSyncComponent } from "./edit-sync/edit-sync.component";
import { SyncRoutingModule } from "./sync.routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlsModule } from "../../@controls/controls.module";
import { VisModule } from "ngx-vis";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbTabsetModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbListModule,
  NbTreeGridModule,
  
} from "@nebular/theme";


@NgModule({
  declarations: [
    ListSyncComponent,   
    CreateSyncComponent, 
    DetailSyncComponent,
    EditSyncComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SyncRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NgxEchartsModule,
    ChartModule,
    NbDatepickerModule,
    NgxChartsModule,
    NbButtonModule,
    NbCardModule,
    ControlsModule,
    NbCheckboxModule,
    VisModule,
    NbIconModule,
    NbUserModule,
    NbListModule,
    NbTabsetModule
  ]
})
export class SyncModule {}
