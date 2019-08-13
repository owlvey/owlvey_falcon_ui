import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductRoutingModule } from "./product.routing.module";
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [ListProductComponent],
  imports: [CommonModule, ProductRoutingModule, Ng2SmartTableModule, NbCardModule]
})
export class ProductModule { }
