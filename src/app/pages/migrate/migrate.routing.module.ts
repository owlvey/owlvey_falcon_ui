
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMigrateComponent } from './list-migrate/list-migrate.component';


const routes: Routes = [
  { path: '', component: ListMigrateComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigrateRoutingModule { }
 
export const routedComponents = [
  ListMigrateComponent,  
];
