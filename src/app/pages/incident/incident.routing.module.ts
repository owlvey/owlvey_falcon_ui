import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListIncidentComponent } from './list-incident/list-incident.component';


const routes: Routes = [
  { path: '', component: ListIncidentComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule {}
