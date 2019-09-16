import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListIncidentComponent } from './list-incident/list-incident.component';
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { DetailIncidentComponent } from './detail-incident/detail-incident.component';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';


const routes: Routes = [
  { path: '', component: ListIncidentComponent } ,
  { path: 'detail', component: DetailIncidentComponent }  ,
  { path: 'edit', component: EditIncidentComponent }  ,
  { path: 'create', component: CreateIncidentComponent }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule {}
