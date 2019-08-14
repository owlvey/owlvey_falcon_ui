import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductRoutingModule } from './product.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListProductComponent],
  imports: [CommonModule, SharedModule, ProductRoutingModule]
})
export class ProductModule { }
