import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { environment } from '../../../environments/environment';
import * as signalR from '@aspnet/signalr';
import { EventHandlerService } from 'src/app/event-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  public hubConnection: HubConnection;
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private eventHandlerService: EventHandlerService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    this.startUp();
  }

  startUp() {

    // this lines up with the hub mapped in the startup
    Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("url", {
        accessTokenFactory: () => this.authService.getToken()
      })
      .configureLogging(LogLevel.Information)
      .build();


    // this lines up with the method called by `SendAsync`
    this.hubConnection.on('onUpdateProjectStatus', (msg) => {
      console.log('onUpdateProjectStatus', msg);
      this.eventHandlerService.event.next({name: 'onUpdateProjectStatus', data: msg});
    });

    // this lines up with the method called by `SendAsync`
    this.hubConnection.on('onUpdateProjectServiceStatus', (msg) => {
      console.log('onUpdateProjectServiceStatus', msg);
      this.eventHandlerService.event.next({name: 'onUpdateProjectServiceStatus', data: msg});
    });

    // this lines up with the method called by `SendAsync`
    this.hubConnection.on('onUpdateProjectFeatureStatus', (msg) => {
      console.log('onUpdateProjectFeatureStatus', msg);
      this.eventHandlerService.event.next({name: 'onUpdateProjectFeatureStatus', data: msg});
    });

    // this lines up with the method called by `SendAsync`
    this.hubConnection.on('onResultLoginCallback', (msg) => {
      console.log('onResultLoginCallback', msg);
      this.eventHandlerService.event.next({name: 'createExternalGitProviderSuccess', data: msg});
    });

    // this will start the long polling connection
    this.hubConnection.start()
      .then(() => {
        console.log('Connection started');
      })
      .catch(err => {
        console.log(err);
      });

  }
}
