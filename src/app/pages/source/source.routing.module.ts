import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSourceComponent } from './create-source/create-source.component';
import { ItemsSourceComponent } from './items-source/items-source.component';

import { CreatePropItemsSourceComponent } from './create-prop-items-source/create-prop-items-source.component';
import { CreateIntItemsSourceComponent  } from './create-int-items-source/create-int-items-source.component';
import { CreateLatencyItemsSourceComponent  } from './create-latency-items-source/create-latency-items-source.component';

import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ListSourceComponent } from './list-source/list-source.component';
import { TreeMapSourceComponent } from './treemap-source/treemap-source.component';

import { EditSourceComponent } from './edit-source/edit-source.component';

const routes: Routes = [
  { path: '', component: ListSourceComponent },
  { path: 'create', component: CreateSourceComponent},
  { path: 'edit', component: EditSourceComponent},
  { path: 'items/create/proportion', component: CreatePropItemsSourceComponent},
  { path: 'items/create/interaction', component: CreateIntItemsSourceComponent},
  { path: 'items/create/latency', component: CreateLatencyItemsSourceComponent},
  { path: 'detail', component: DetailSourceComponent},
  { path: 'items', component: ItemsSourceComponent},
  { path: 'treemap', component: TreeMapSourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceRoutingModule {}
