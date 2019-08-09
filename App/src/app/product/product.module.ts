import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';

@NgModule({
  declarations: [CreateProductComponent, ListProductComponent],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
