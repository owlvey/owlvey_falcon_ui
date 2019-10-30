import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbDatepickerModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbBadgeModule,  
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';

import { OwlveyLoginComponent } from './components/auth/login/login.component'
import { OwlveyAuthComponent } from './components/auth/auth.component'
import { OwlveyLogoutComponent } from './components/auth/logout/logout.component'
import { NbAuthModule } from '@nebular/auth';
import { RouterModule } from '@angular/router';
import { OwlveyTileComponent } from './components/tile/tile.component';
import { OwlveyRegisterComponent } from './components/auth/register/register.component';
import { OwlveyResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { OwlveyRequestPasswordComponent } from './components/auth/request-password/request-password.component';

const NB_MODULES = [
  NbInputModule,
  NbCheckboxModule,
  NbAlertModule,
  NbCardModule,
  NbLayoutModule,
  NbAuthModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDatepickerModule,
  NbBadgeModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  OwlveyAuthComponent,
  OwlveyRequestPasswordComponent,
  OwlveyRegisterComponent,
  OwlveyLoginComponent,
  OwlveyResetPasswordComponent,
  OwlveyLogoutComponent,
  OwlveyTileComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule,    ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DARK_THEME, DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME ],
        ).providers,
      ],
    };
  }
}
