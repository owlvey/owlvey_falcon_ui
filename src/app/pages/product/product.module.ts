import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListProductComponent } from "./list-product/list-product.component";
import { DetailProductComponent } from "./detail-product/detail-product.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { DashboardProductComponent } from "./dashboard-product/dashboard-product.component";
import { OperationDashboardComponent } from "./doperation-product/doperation-product.component";
import { ProductRoutingModule } from "./product.routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlsModule } from "./../../@controls/controls.module";
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
  NbProgressBarModule
  
} from "@nebular/theme";
import { EditProductComponent } from './edit-product/edit-product.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    ListProductComponent,
    DetailProductComponent,
    CreateProductComponent,
    EditProductComponent,
    DashboardProductComponent,
    OperationDashboardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductRoutingModule,
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
    NbTabsetModule,
    NbProgressBarModule,
    NbActionsModule,
    ThemeModule,
  ]
})
export class ProductModule {}
