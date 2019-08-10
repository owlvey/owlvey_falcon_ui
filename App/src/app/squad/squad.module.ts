import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormSquadComponent } from "./form-squad/form-squad.component";
import { ListSquadComponent } from "./list-squad/list-squad.component";
import { SharedModule } from "../shared/shared.module";
import { SquadRoutingModule } from "./squad.routing.module";

@NgModule({
  declarations: [FormSquadComponent, ListSquadComponent],
  imports: [CommonModule, SharedModule, SquadRoutingModule]
})
export class SquadModule {}
