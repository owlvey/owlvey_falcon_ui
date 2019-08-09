import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListFeatureComponent } from "./list-feature/list-feature.component";

const routes: Routes = [{ path: "feature", component: ListFeatureComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
