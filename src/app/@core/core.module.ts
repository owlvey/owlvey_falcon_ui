import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType, NbAuthOAuth2Token, NbOAuth2GrantType, NbOAuth2ClientAuthMethod } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';
import { UserData } from './data/users';
import { ElectricityData } from './data/electricity';
import { SmartTableData } from './data/smart-table';
import { UserActivityData } from './data/user-activity';
import { OrdersChartData } from './data/orders-chart';
import { ProfitChartData } from './data/profit-chart';
import { TrafficListData } from './data/traffic-list';
import { EarningData } from './data/earning';
import { OrdersProfitChartData } from './data/orders-profit-chart';
import { TrafficBarData } from './data/traffic-bar';
import { ProfitBarAnimationChartData } from './data/profit-bar-animation-chart';
import { TemperatureHumidityData } from './data/temperature-humidity';
import { SolarData } from './data/solar';
import { TrafficChartData } from './data/traffic-chart';
import { StatsBarData } from './data/stats-bar';
import { CountryOrderData } from './data/country-order';
import { StatsProgressBarData } from './data/stats-progress-bar';
import { VisitorsAnalyticsData } from './data/visitors-analytics';
import { SecurityCamerasData } from './data/security-cameras';

import { UserService } from './mock/users.service';
import { ElectricityService } from './mock/electricity.service';
import { SmartTableService } from './mock/smart-table.service';
import { UserActivityService } from './mock/user-activity.service';
import { OrdersChartService } from './mock/orders-chart.service';
import { ProfitChartService } from './mock/profit-chart.service';
import { TrafficListService } from './mock/traffic-list.service';
import { EarningService } from './mock/earning.service';
import { OrdersProfitChartService } from './mock/orders-profit-chart.service';
import { TrafficBarService } from './mock/traffic-bar.service';
import { ProfitBarAnimationChartService } from './mock/profit-bar-animation-chart.service';
import { TemperatureHumidityService } from './mock/temperature-humidity.service';
import { SolarService } from './mock/solar.service';
import { TrafficChartService } from './mock/traffic-chart.service';
import { StatsBarService } from './mock/stats-bar.service';
import { CountryOrderService } from './mock/country-order.service';
import { StatsProgressBarService } from './mock/stats-progress-bar.service';
import { VisitorsAnalyticsService } from './mock/visitors-analytics.service';
import { SecurityCamerasService } from './mock/security-cameras.service';
import { CustomersGateway }  from './data/customers.gateway';
import { ProductsGateway }  from './data/products.gateway';
import { SourcesGateway }  from './data/sources.gateway';
import { MockDataModule } from './mock/mock-data.module';
import { FeaturesGateway } from './data/features.gateway';
import { UsersGateway } from './data/users.gateway';
import { PortfoliosGateway } from './data/portfolios.gateway';
import { SquadsGateway }  from './data/squads.gateway';
import { FormatService } from './utils/format.service';
import { EnvironmentService } from './utils/env.service';
import { IncidentsGateway } from './data/incident.gateway';
import { environment } from '../../environments/environment';
import { CustomerEventHub } from './hubs/customer.eventhub';
import { CacheManager } from './data/cache.manager';


const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const EVENT_HUBS = [
  { provide: CustomerEventHub, useClass: CustomerEventHub }
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: ElectricityData, useClass: ElectricityService },
  { provide: SmartTableData, useClass: SmartTableService },
  { provide: UserActivityData, useClass: UserActivityService },
  { provide: OrdersChartData, useClass: OrdersChartService },
  { provide: ProfitChartData, useClass: ProfitChartService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  { provide: TrafficBarData, useClass: TrafficBarService },
  { provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: SolarData, useClass: SolarService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: CountryOrderData, useClass: CountryOrderService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },
  { provide: CustomersGateway, useClass: CustomersGateway },
  { provide: ProductsGateway, useClass: ProductsGateway },
  { provide: SourcesGateway, useClass: SourcesGateway },
  { provide: FeaturesGateway, useClass: FeaturesGateway },
  { provide: PortfoliosGateway, useClass: PortfoliosGateway },
  { provide: SquadsGateway, useClass: SquadsGateway },
  { provide: UsersGateway, useClass: UsersGateway },
  { provide: FormatService, useClass: FormatService },
  { provide: EnvironmentService, useClass: EnvironmentService } ,
  { provide: IncidentsGateway, useClass: IncidentsGateway },
  { provide: CacheManager, useClass: CacheManager },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

 export class AuthorityResolver {
  getUrl(baseUrl: string, type: string): string {
    if (type && type === "docker")
    {
      return "http://" + window.location.hostname + ":45002/";
    }
    return baseUrl;
  }
 }

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...EVENT_HUBS,
  ...NbAuthModule.forRoot({

    strategies: [

      NbOAuth2AuthStrategy.setup(
        { 
          name: 'password',
          baseEndpoint: new AuthorityResolver().getUrl(environment.authority, environment.type),
          clientId: environment.clientId,
          clientSecret: environment.clientSecret,
          clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
          token: {
            endpoint: 'connect/token',
            grantType: NbOAuth2GrantType.PASSWORD,
            scope: 'openid profile api',
            class: NbAuthOAuth2Token,
            requireValidToken: true
          },
          refresh: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.REFRESH_TOKEN
          }
        }
      ),
    ],
    forms: {

      login: {
        redirectDelay: 100,
        strategy: 'password',
        rememberMe: false,
        showMessages: {
          success: true,
          error: true,
        },
      },

      logout: {
        redirectDelay: 500,
        strategy: 'password',
      },

    }
  }).providers,

  NbSecurityModule.forRoot({
    
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
  EnvironmentService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
