
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRiskComponent } from './list-risk/list-risk.component';
import { EditSecurityRiskComponent } from './edit-security-risk/edit-risk.component';
import { DetailSecurityRiskComponent } from './detail-security-risk/detail-risk.component';
import { DetailReliabilityRiskComponent } from './detail-reliability-risk/detail-reliability-source.component';
import { EditReliabilityRiskComponent } from './edit-reliability-risk/edit-risk.component';

const routes: Routes = [
  { path: '', component: ListRiskComponent},
  { path: 'security/edit', component: EditSecurityRiskComponent},
  { path: 'security/detail', component: DetailSecurityRiskComponent},
  { path: 'reliability/detail', component: DetailReliabilityRiskComponent},
  { path: 'reliability/edit', component: EditReliabilityRiskComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskRoutingModule { }

export const routedComponents = [
    ListRiskComponent, EditSecurityRiskComponent,
    DetailReliabilityRiskComponent, EditReliabilityRiskComponent
];
