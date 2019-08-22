import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CreateProductComponent } from './create-product/create-product.component';


const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'detail', component: DetailProductComponent},
  { path: 'create', component: CreateProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
