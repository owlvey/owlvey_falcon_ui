import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListserviceGroupComponent } from "./list-serviceGroup/list-serviceGroup.component";

const routes: Routes = [
  { path: "", component: ListserviceGroupComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceGroupRoutingModule {}

export const routedComponents = [
  ListserviceGroupComponent,  
];
