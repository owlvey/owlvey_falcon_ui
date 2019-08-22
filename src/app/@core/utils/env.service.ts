import { Injectable } from '@angular/core';

@Injectable()
export class EnvironmentService
{
  getUrl(baseUrl: string, type: string): string
  {
    if (type && type === "docker")
    {
      return "http://" + window.location.host + "/";
    }
    return baseUrl;
  }
}
