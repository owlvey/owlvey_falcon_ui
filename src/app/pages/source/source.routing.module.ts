import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSourceComponent } from './create-source/create-source.component';
import { AvaIntDetailSourceComponent } from './ava-int-detail-source/ava-int-detail-source.component';
import { AvaIntItemsSourceComponent } from './ava-int-items-source/ava-int-items-source.component';
import { AvaPropDetailSourceComponent } from './ava-prop-detail-source/ava-prop-detail-source.component';
import { AvaPropItemsSourceComponent } from './ava-prop-items-source/ava-prop-items-source.component';

import { ExpIntDetailSourceComponent } from './exp-int-detail-source/exp-int-detail-source.component';
import { ExpPropDetailSourceComponent } from './exp-prop-detail-source/exp-prop-detail-source.component';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ListSourceComponent } from './list-source/list-source.component';
import { TreeMapSourceComponent } from './treemap-source/treemap-source.component';

import { ExpIntItemsSourceComponent } from './exp-int-items-source/exp-int-items-source.component';
import { ExpPropItemsSourceComponent } from './exp-prop-items-source/exp-prop-items-source.component';
import { LatencySourceItemsComponent } from './latency-items-source/latency-items-source.component';
import { AvaEditSourceComponent } from './ava-edit-source/ava-edit-source.component';
import { ExpEditSourceComponent } from './exp-edit-source/exp-edit-source.component';
import { LatencyEditSourceComponent } from './latency-edit-source/latency-edit-source.component';
import { LatencyDetailSourceComponent } from './latency-detail-source/latency-detail-source.component';

const routes: Routes = [
  { path: '', component: ListSourceComponent },
  { path: 'create', component: CreateSourceComponent},
  { path: 'availability/edit', component: AvaEditSourceComponent},
  { path: 'experience/edit', component: ExpEditSourceComponent},  
  { path: 'latency/edit', component: LatencyEditSourceComponent},    
  { path: 'availability/interaction/detail', component: AvaIntDetailSourceComponent},
  { path: 'availability/interaction/items', component: AvaIntItemsSourceComponent},
  { path: 'availability/proportion/detail', component: AvaPropDetailSourceComponent},
  { path: 'availability/proportion/items', component: AvaPropItemsSourceComponent},  
  { path: 'experience/interaction/detail', component: ExpIntDetailSourceComponent},  
  { path: 'experience/interaction/items', component: ExpIntItemsSourceComponent},
  { path: 'experience/proportion/detail', component: ExpPropDetailSourceComponent},
  { path: 'experience/proportion/items', component: ExpPropItemsSourceComponent},  
  { path: 'latency/detail', component: LatencyDetailSourceComponent},  
  { path: 'latency/items', component: LatencySourceItemsComponent},    
  { path: 'detail', component: DetailSourceComponent},  
  { path: 'treemap', component: TreeMapSourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceRoutingModule {}
