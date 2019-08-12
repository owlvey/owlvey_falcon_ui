import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListPortfolioComponent } from "./list-portfolio/list-portfolio.component";

const routes: Routes = [{ path: "portfolio", component: ListPortfolioComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {}
