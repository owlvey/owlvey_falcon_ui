import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailFeatureComponent } from "./detail-feature/detail-feature.component";
import { ListFeatureComponent } from "./list-feature/list-feature.component";
import { CreateFeatureComponent } from "./create-feature/create-feature.component";
import { EditFeatureComponent } from "./edit-feature/edit-feature.component";

const routes: Routes = [
  { path: "", component: ListFeatureComponent },
  { path: "detail", component: DetailFeatureComponent },
  { path: "create", component: CreateFeatureComponent },
  { path: "edit", component: EditFeatureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}

export const routedComponents = [
  ListFeatureComponent,
  DetailFeatureComponent,
  CreateFeatureComponent,
  EditFeatureComponent
];
