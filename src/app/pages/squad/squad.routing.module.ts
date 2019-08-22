
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSquadComponent } from './list-squad/list-squad.component';
import { CreateSquadComponent } from './create-squad/create-squad.component';
import { DetailSquadComponent } from './detail-squad/detail-squad.component';
import { EditSquadComponent } from './edit-squad/edit-squad.component';

const routes: Routes = [
  { path: '', component: ListSquadComponent},
  { path: 'detail', component: DetailSquadComponent },
  { path: 'edit', component: EditSquadComponent },
  { path: 'create', component: CreateSquadComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadRoutingModule { }
 
export const routedComponents = [
  ListSquadComponent,
  DetailSquadComponent,  
  CreateSquadComponent
];
