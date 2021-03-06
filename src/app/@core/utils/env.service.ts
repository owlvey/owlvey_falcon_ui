import { Injectable } from '@angular/core';

@Injectable()
export class EnvironmentService {
  constructor() {

  }

  getUrl(baseUrl: string, type: string): string {
    if (type && type === 'docker')
    {
      return 'http://' + window.location.hostname + ':45001/';
    }
    return baseUrl;
  }
}
