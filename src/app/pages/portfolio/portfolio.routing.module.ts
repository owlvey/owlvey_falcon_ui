import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPortfolioComponent } from './detail-portfolio/detail-portfolio.component';
import { ListPortfolioComponent } from './list-portfolio/list-portfolio.component';

const routes: Routes = [
  { path: '', component: ListPortfolioComponent },
  { path: 'detail', component: DetailPortfolioComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {}
