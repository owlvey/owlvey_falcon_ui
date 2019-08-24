import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListCustomerComponent } from "./list-customer/list-customer.component";
import { DetailCustomerComponent } from "./detail-customer/detail-customer.component";
import { CreateCustomerComponent } from "./create-customer/create-customer.component";
import { CustomerRoutingModule } from "./customer.routing.module";
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
  NbTreeGridModule
} from "@nebular/theme";
import { EditCustomerComponent } from "./edit-customer/edit-customer.component";

@NgModule({
  declarations: [
    DetailCustomerComponent,
    ListCustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomerRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NgxEchartsModule,
    ChartModule,
    NbDatepickerModule,
    NgxChartsModule,
    NbButtonModule,
    NbCardModule,
    ControlsModule,
    NbCheckboxModule
  ]
})
export class CustomerModule {}
