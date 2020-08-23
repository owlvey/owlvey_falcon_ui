
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListThreatComponent } from './list-threat/list-threat.component';
import { CreateSecurityThreatComponent } from './create-security-threat/create-threat.component';
import { DetailSecurityThreatComponent } from './detail-security-threat/detail-threat.component';
import { EditSecurityThreatComponent } from './edit-security-threat/edit-threat.component';

const routes: Routes = [
  { path: '', component: ListThreatComponent},
  { path: 'security/create', component: CreateSecurityThreatComponent},
  { path: 'security/detail', component: DetailSecurityThreatComponent},
  { path: 'security/edit', component: EditSecurityThreatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreatRoutingModule { }

export const routedComponents = [
    ListThreatComponent, CreateSecurityThreatComponent, DetailSecurityThreatComponent, EditSecurityThreatComponent
];
