
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRiskComponent } from './list-risk/list-risk.component';
import { CreateSecurityRiskComponent } from './create-security-risk/create-risk.component';
import { DetailSecurityRiskComponent } from './detail-security-risk/detail-risk.component';

const routes: Routes = [
  { path: '', component: ListRiskComponent},
  { path: 'security/create', component: CreateSecurityRiskComponent},
  { path: 'security/detail', component: DetailSecurityRiskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskRoutingModule { }
 
export const routedComponents = [
    ListRiskComponent, CreateSecurityRiskComponent
];
