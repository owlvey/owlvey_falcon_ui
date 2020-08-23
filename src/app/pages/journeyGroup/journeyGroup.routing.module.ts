import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListJourneyGroupComponent } from "./list-journeyGroup/list-journeyGroup.component";
import { AnnualJourneyGroupComponent } from "./annual-journeyGroup/annual-journeyGroup.component";

const routes: Routes = [
  { path: "", component: ListJourneyGroupComponent },
  { path: "annual", component: AnnualJourneyGroupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceGroupRoutingModule {}

export const routedComponents = [
  ListJourneyGroupComponent,
  AnnualJourneyGroupComponent,
];
