
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSquadComponent } from './list-squad/list-squad.component';
import { CreateSquadComponent } from './create-squad/create-squad.component';
import { DetailSquadComponent } from './detail-squad/detail-squad.component';
import { EditSquadComponent } from './edit-squad/edit-squad.component';
import { CreateUserSquadComponent } from './create-user-squad/create-user-squad.component';
import { DetailUserSquadComponent } from './detail-user-squad/detail-user-squad.component';
import { CreateProductSquadComponent } from './create-product-squad/create-product-squad.component';
import { DetailProductSquadComponent } from './detail-product-squad/detail-product-squad.component';
import { GraphSquadComponent } from './graph-squad/graph-squad.component';

const routes: Routes = [
  { path: '', component: ListSquadComponent},
  { path: 'detail', component: DetailSquadComponent },
  { path: 'edit', component: EditSquadComponent },
  { path: 'create', component: CreateSquadComponent },  
  { path: 'graph', component: GraphSquadComponent},  
  { path: 'users/create', component: CreateUserSquadComponent }, 
  { path: 'users/detail', component: DetailUserSquadComponent },
  { path: 'products/asociate', component: CreateProductSquadComponent }, 
  { path: 'products/detail', component: DetailProductSquadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SquadRoutingModule { }
 
export const routedComponents = [
  ListSquadComponent,
  DetailSquadComponent,  
  CreateSquadComponent,
  CreateUserSquadComponent,
  DetailUserSquadComponent,
  CreateProductSquadComponent,
  DetailProductSquadComponent
];
