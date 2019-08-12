import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreatePortfolioComponent } from "./create-portfolio/create-portfolio.component";
import { ListPortfolioComponent } from "./list-portfolio/list-portfolio.component";
import { SharedModule } from "../shared/shared.module";
import { PortfolioRoutingModule } from "./portfolio.routing.module";

@NgModule({
  declarations: [CreatePortfolioComponent, ListPortfolioComponent],
  imports: [CommonModule, SharedModule, PortfolioRoutingModule]
})
export class PortfolioModule {}
