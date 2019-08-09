import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../core/auth/auth-guard.service";
import { ListSquadComponent } from "./list-squad/list-squad.component";

const routes: Routes = [{ path: "squad", component: ListSquadComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SquadRoutingModule {}
