import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPortfolioComponent } from './detail-portfolio/detail-portfolio.component';
import { ListPortfolioComponent } from './list-portfolio/list-portfolio.component';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';
import { AnnualPortfolioComponent } from './annual-portfolio/annual-portfolio.component';

const routes: Routes = [
  { path: '', component: ListPortfolioComponent },
  { path: 'detail', component: DetailPortfolioComponent}, 
  { path: 'edit', component: EditPortfolioComponent},
  { path: 'create', component: CreatePortfolioComponent}, 
  { path: 'annual', component: AnnualPortfolioComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {}
