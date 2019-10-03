import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SourceModule } from './source/source.module';
import { CustomerModule} from './customer/customer.module';
import { PortfolioModule} from './portfolio/portfolio.module';
import { SquadModule } from './squad/squad.module';
import { HomeModule } from './home/home.module';


import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCheckboxModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    SourceModule,
    CustomerModule,
    PortfolioModule,
    SquadModule,
    UserModule,
    HomeModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
