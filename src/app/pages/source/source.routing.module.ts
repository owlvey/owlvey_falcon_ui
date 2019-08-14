import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ListSourceComponent } from './list-source/list-source.component';

const routes: Routes = [
  { path: '', component: ListSourceComponent },
  { path: ':sourceId', component: DetailSourceComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceRoutingModule {}
