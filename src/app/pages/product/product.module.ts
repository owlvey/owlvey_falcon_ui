import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListProductComponent } from "./list-product/list-product.component";
import { DetailProductComponent } from "./detail-product/detail-product.component";
import { CreateProductComponent } from "./create-product/create-product.component";
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
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule
} from "@nebular/theme";
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    ListProductComponent,
    DetailProductComponent,
    CreateProductComponent,
    EditProductComponent
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
    VisModule
  ]
})
export class ProductModule {}
