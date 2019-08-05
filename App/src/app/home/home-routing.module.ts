import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { GetStartedComponent } from './get-started/get-started.component';

import { AuthGuardService } from '../core/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: IndexComponent  },
  { path: 'home', component: IndexComponent, canActivate: [AuthGuardService]  },
  { path: 'home/get-started', component: GetStartedComponent, canActivate: [AuthGuardService]  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
