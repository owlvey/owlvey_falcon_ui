import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListserviceGroupComponent } from "./list-serviceGroup/list-serviceGroup.component";
import { AnnualServiceGroupComponent } from "./annual-serviceGroup/annual-serviceGroup.component";

const routes: Routes = [
  { path: "", component: ListserviceGroupComponent },  
  { path: "annual", component: AnnualServiceGroupComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceGroupRoutingModule {}

export const routedComponents = [
  ListserviceGroupComponent,  
  AnnualServiceGroupComponent,
];
