import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHomeComponent } from './list-home/list-home.component';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';

const routes: Routes = [
  { path: '', component: ListHomeComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
