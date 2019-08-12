import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./@theme/theme.module";
import { Routes, RouterModule } from "@angular/router";
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from "msal";

import { BroadcastService } from "@azure/msal-angular";
import { MsalService } from "@azure/msal-angular";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs/Subscription";
import { ToastrModule } from "ngx-toastr";

import { SharedModule } from "./shared/shared.module";
import { AccountModule } from "./account/account.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { HomeModule } from "./home/home.module";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModalModule } from "./modal/modal.module";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { AuthNotAuthorizedComponent } from "./auth-not-authorized/auth-not-authorized.component";
import { AuthGuardService } from "./core/auth/auth-guard.service";
import { TokenInterceptor } from "./core/auth/token.interceptor";
import { AuthService } from "./core/auth/auth.service";
import { JwtInterceptor } from "./core/auth/jwt.interceptor";
import { NbPopoverModule } from "@nebular/theme";
import { TourNgBootstrapModule } from "ngx-tour-ng-bootstrap";
import { InitialsPipe } from "./initials.pipe";
import { AuthenticationService } from "./core/auth/authentication.service";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { CustomerModule } from "./customer/customer.module";
import { FeatureModule } from "./feature/feature.module";
import { SquadModule } from "./squad/squad.module";
import { SourceModule } from "./source/source.module"
const routes: Routes = [
  { path: "signin-oidc", component: AuthCallbackComponent },
  { path: "forbidden", component: AuthNotAuthorizedComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    AuthNotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbPopoverModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(routes),
    AccountModule,
    DashboardModule,
    HomeModule,
    CustomerModule,
    FeatureModule,
    SquadModule,
    SourceModule,
    ModalModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-center",
      preventDuplicates: true
    })
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthGuardService,
    AuthService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
