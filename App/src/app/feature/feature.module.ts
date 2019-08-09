import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateFeatureComponent } from "./create-feature/create-feature.component";
import { ListFeatureComponent } from "./list-feature/list-feature.component";
import { SharedModule } from "../shared/shared.module";
import { FeatureRoutingModule } from "./feature.routing.module";

@NgModule({
  declarations: [CreateFeatureComponent, ListFeatureComponent],
  imports: [CommonModule, SharedModule, FeatureRoutingModule]
})
export class FeatureModule {}
