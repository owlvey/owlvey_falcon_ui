import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';


import { OwlveyAuthComponent } from './@theme/components/auth/auth.component';
import { OwlveyLoginComponent } from './@theme/components/auth/login/login.component';
import { OwlveyLogoutComponent } from './@theme/components/auth/logout/logout.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: OwlveyAuthComponent,
    children: [
      {
        path: '',
        component: OwlveyLoginComponent,
      },
      {
        path: 'login',
        component: OwlveyLoginComponent,
      },
      {
        path: 'logout',
        component: OwlveyLogoutComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages'}
];

const config: ExtraOptions = {
  useHash: false,
  onSameUrlNavigation: 'reload',
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
