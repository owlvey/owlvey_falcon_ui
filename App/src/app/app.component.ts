import { Component, OnInit, HostListener } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { NbMenuItem } from "@nebular/theme";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { UtilsService } from "./utils.service";
import { EventHandlerService } from "./event-handler.service";
//import { TourService } from 'ngx-tour-core';

@Component({
  selector: "ngx-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  menu: NbMenuItem[] = [];
  x: string = "";

  isAccountView: boolean = false;
  organizationId: string = "";

  constructor(
    private analytics: AnalyticsService,
    private utilService: UtilsService,
    private eventHandlerService: EventHandlerService,
    private router: Router
  ) {
    this.menu = [
      {
        title: "Dashboard",
        icon: "fas fa-chart-line",
        link: "/"
      },
      {
        title: "OPTIONS",
        group: true
      },
      {
        title: "Customers",
        icon: "fas fa-building",
        link: "/customer"
      },
      {
        title: "Sources",
        icon: "fas fa-building",
        link: "/source"
      },
      {
        title: "Products",
        icon: "fas fa-building",
        link: "/product"
      },
      {
        title: "Portfolio",
        icon: "fas fa-building",
        link: "/portfolio"
      },
      {
        title: "Features",
        icon: "fas fa-building",
        link: "/feature"
      },
      {
        title: "Squads",
        icon: "fas fa-building",
        link: "/squad"
      }
    ];
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
