import { NgModule } from '@angular/core';
import { NbMenuModule, NbIconModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { HomeModule } from './home/home.module';
import { SourceModule } from './source/source.module';
import { CustomerModule } from './customer/customer.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { JourneyGroupModule } from './journeyGroup/journeyGroupModule';
import { UserModule } from './user/user.module';
import { SquadModule } from './squad/squad.module';
import { ThreatModule } from './threats/threat.module';
import { RiskModule } from './risks/risks.module';
import { SyncModule } from './sync/sync.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    SourceModule,
    CustomerModule,
    PortfolioModule,
    JourneyGroupModule,
    SquadModule,
    UserModule,
    ThreatModule,
    RiskModule,
    HomeModule,
    SyncModule,
    NbIconModule,
    NbSelectModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
