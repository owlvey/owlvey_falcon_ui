import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSyncComponent } from './list-sync/list-sync.component';
import { CreateSyncComponent } from './create-sync/create-sync.component';
import { DetailSyncComponent } from './detail-sync/detail-sync.component';
import { EditSyncComponent } from './edit-sync/edit-sync.component';


const routes: Routes = [
  { path: '', component: ListSyncComponent },  
  { path: 'create', component: CreateSyncComponent },  
  { path: 'detail', component: DetailSyncComponent },  
  { path: 'edit', component: EditSyncComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncRoutingModule { }
