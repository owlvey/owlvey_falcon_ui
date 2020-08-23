import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SourceModule } from './source/source.module';
import { CustomerModule} from './customer/customer.module';
import { SyncModule } from './sync/sync.module';
import { PortfolioModule} from './portfolio/portfolio.module';
import { ServiceGroupModule } from './serviceGroup/serviceGroup.module';
import { SquadModule } from './squad/squad.module';
import { ThreatModule } from './threats/threat.module'
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
import { TooltipComponent } from './common/components/tooltipComponent';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCheckboxModule,    
    ECommerceModule,
    MiscellaneousModule,
    SourceModule,
    CustomerModule,
    PortfolioModule,
    ServiceGroupModule,
    SquadModule,
    UserModule,
    ThreatModule,
    HomeModule,
    SyncModule,
    NbIconModule,
  ],
  declarations: [
    PagesComponent,
    TooltipComponent
  ],
  entryComponents: [TooltipComponent],
})
export class PagesModule {

}
