import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'customers',
      loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    },  
    {
      path: 'squads',
      loadChildren: () => import('./squad/squad.module').then(m => m.SquadModule),
    },    
    {
      path: 'sources',
      loadChildren: () => import('./source/source.module').then(m => m.SourceModule),
    }, 
    {
      path: 'users',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },    
    {
      path: 'products',
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    },    
    {
      path: 'features',
      loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
    },    
    {
      path: 'migrations',
      loadChildren: () => import('./migrate/migrate.module').then(m => m.MigrateModule),
    },    
    {
      path: 'portfolios',
      loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
    },    
    {
      path: 'incidents',
      loadChildren: () => import('./incident/incident.module').then(m => m.IncidentModule),
    },    
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
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
