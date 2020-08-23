import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      canActivate: [AuthGuard],
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },  
    {
      path: 'customers',
      canActivate: [AuthGuard],
      loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    },  
    {
      path: 'squads',
      canActivate: [AuthGuard],
      loadChildren: () => import('./squad/squad.module').then(m => m.SquadModule),
    },  
    {
      path: 'threats',
      canActivate: [AuthGuard],
      loadChildren: () => import('./threats/threat.module').then(m => m.ThreatModule),
    },    
    {
      path: 'risks',
      canActivate: [AuthGuard],
      loadChildren: () => import('./risks/risks.module').then(m => m.RiskModule),
    },    
    {
      path: 'sources',
      canActivate: [AuthGuard],
      loadChildren: () => import('./source/source.module').then(m => m.SourceModule),
    }, 
    {
      path: 'users',
      canActivate: [AuthGuard],
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },    
    {
      path: 'products',
      canActivate: [AuthGuard],
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    },        
    {
      path: 'features',
      canActivate: [AuthGuard],
      loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
    },    
    {
      path: 'migrations',
      loadChildren: () => import('./migrate/migrate.module').then(m => m.MigrateModule),
    },    
    {
      path: 'exports',
      loadChildren: () => import('./export/export.module').then(m => m.ExportModule),
    },    
    {
      path: 'sync',
      loadChildren: () => import('./sync/sync.module').then(m => m.SyncModule),
    },    
    {
      path: 'groups',
      canActivate: [AuthGuard],
      loadChildren: () => import('./serviceGroup/serviceGroup.module').then(m => m.ServiceGroupModule),
    },    
    {
      path: 'portfolios',
      canActivate: [AuthGuard],
      loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
    },    
    {
      path: 'incidents',
      canActivate: [AuthGuard],
      loadChildren: () => import('./incident/incident.module').then(m => m.IncidentModule),
    },    
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
