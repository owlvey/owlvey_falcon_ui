import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSourceComponent } from './list-source/list-Source.component';

const routes: Routes = [
  { path: 'source', component: ListSourceComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SourceRoutingModule { }
