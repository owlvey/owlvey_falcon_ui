import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListProductComponent } from "./list-product/list-product.component";

const routes: Routes = [{ path: "product", component: ListProductComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
