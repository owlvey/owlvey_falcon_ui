import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment as env } from '../environments/environment';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ClientAuthMethod, NbOAuth2ResponseType, NbOAuth2GrantType, NbAuthOAuth2Token, NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthService, NbDummyAuthStrategyOptions, NbDummyAuthStrategy } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),    
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
    })
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function ( req : HttpRequest<any>) {         
        // avoid CORS attack 
        const whiteList = ["/customers", "/products", "/squads", "/services", "/features",
                           "/sources", "/incidents", "/users"];
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
    this.oauthStrategy.setOptions({
      name: 'password',
      baseEndpoint: env.type === 'docker' ? `http://${window.location.hostname}:45002/` : env.authority,
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
      refresh: {
        endpoint: 'token',
        grantType: NbOAuth2GrantType.REFRESH_TOKEN
      }
    });
  }
}
