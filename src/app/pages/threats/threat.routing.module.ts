
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListThreatComponent } from './list-threat/list-threat.component';
import { CreateSecurityThreatComponent } from './create-security-threat/create-threat.component';
import { DetailSecurityThreatComponent } from './detail-security-threat/detail-threat.component';

const routes: Routes = [
  { path: '', component: ListThreatComponent},
  { path: 'security/create', component: CreateSecurityThreatComponent},
  { path: 'security/detail', component: DetailSecurityThreatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreatRoutingModule { }
 
export const routedComponents = [
    ListThreatComponent, CreateSecurityThreatComponent, DetailSecurityThreatComponent
];
