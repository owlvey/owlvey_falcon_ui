import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSourceComponent } from './create-source/create-source.component';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ListSourceComponent } from './list-source/list-source.component';
import { ItemsSourceComponent } from './items-source/items-source.component';
import { EditSourceComponent } from './edit-source/edit-source.component';

const routes: Routes = [
  { path: '', component: ListSourceComponent },
  { path: 'create', component: CreateSourceComponent},
  { path: 'edit', component: EditSourceComponent},
  { path: 'detail', component: DetailSourceComponent},
  { path: 'items', component: ItemsSourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceRoutingModule {}
