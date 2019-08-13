import { Component, OnInit, HostListener } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { NbMenuItem, NbMenuService } from "@nebular/theme";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { UtilsService } from "./utils.service";
import { EventHandlerService } from "./event-handler.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//import { TourService } from 'ngx-tour-core';
import { CustomersGateway } from './@core/data/customers.gateway';

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
    private menuService: NbMenuService,
    private analytics: AnalyticsService,
    private utilService: UtilsService,
    private eventHandlerService: EventHandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private customersGateway: CustomersGateway
  ) {

    menuService.onItemClick().subscribe((e) => {

    });

    this.menu = [
      {
        title: "Dashboard",
        icon: "fas fa-chart-line"
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
        icon: "fas fa-capsules",
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
    //this.location.path('/customer/' + data[0].id);
    //this.router.navigateByUrl('/customer/' + data[0].id);
  }
}
