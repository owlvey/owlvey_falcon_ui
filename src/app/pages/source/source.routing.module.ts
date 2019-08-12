import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSourceComponent } from './list-source/list-Source.component';

const routes: Routes = [
  { path: '', component: ListSourceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SourceRoutingModule { }
 