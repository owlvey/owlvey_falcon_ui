import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';


const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'detail', component: DetailProductComponent},
  { path: 'create', component: CreateProductComponent},
  { path: 'edit', component: EditProductComponent},
  { path: 'dashboard', component: DashboardProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
