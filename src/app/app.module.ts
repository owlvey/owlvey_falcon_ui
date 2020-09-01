import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbIconModule,
} from '@nebular/theme';
import { NbAuthModule, NbAuthService, NbOAuth2AuthStrategy, NbAuthOAuth2Token, NbOAuth2GrantType, NbOAuth2ClientAuthMethod, NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthJWTInterceptor } from '@nebular/auth';
import { environment as env } from '../environments/environment';
import { AuthGuard } from './auth-guard.service';
import { VisModule } from 'ngx-vis';

/** TODO: remove when work-around is not needed*/
import 'hammerjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    VisModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup(
          {
            name: 'password',
            clientId: env.clientId,
            clientSecret: env.clientSecret,
            clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
            token: {
              endpoint: 'connect/token',
              grantType: NbOAuth2GrantType.PASSWORD,
              scope: 'openid profile api',
              class: NbAuthOAuth2Token,
              requireValidToken: true
            },
            redirect: {
              success: '/pages/home',
              failure: null,
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
          redirect: {
            success: '/auth/login',
            failure: null,
          },
        },

      }
    }),
    ThemeModule.forRoot(),
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function ( req : HttpRequest<any>) {
        // avoid CORS attack
        const whiteList = ["/accounts", "/customers", "/products", "/squads", "/journeys", "/features",
                           "/sources", "/incidents", "/users", "/migrations", "/sourceItems", "/cache",
                          "/risks"];
        let found = false;
        whiteList.forEach(item=>{
           if ( req.url.indexOf(item) > -1 ){
             found = true;
           }
        });
        if (found)
        {
           return false; // add header
        }
        else {
           return true; // remove header
        }
     } },
    AuthGuard],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(
    private authService: NbAuthService,
    private oauthStrategy: NbOAuth2AuthStrategy
  ) {
    // window.location should be available here

    let targetUrl = null;

    if (  env.type === 'docker'){
      targetUrl = `http://${window.location.hostname}:45002/`;
    }
    else
    {
      targetUrl = env.authority;
    }

    this.oauthStrategy.setOptions({
      name: 'password',
      baseEndpoint: targetUrl,
      clientId: env.clientId,
      clientSecret: env.clientSecret,
      clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
      token: {
        endpoint: 'connect/token',
        grantType: NbOAuth2GrantType.PASSWORD,
        scope: 'openid profile api',
        class: NbAuthOAuth2Token,
        requireValidToken: true
      },
      // refresh: {
      //   endpoint: 'token',
      //   grantType: NbOAuth2GrantType.REFRESH_TOKEN
      // }
    });
  }
}
