import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbThemeService } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;


  constructor(private menuService: NbMenuService, private router: Router, private activatedRoute: ActivatedRoute,
    private themeService: NbThemeService) {

  }
  getParameterByName(name, url?: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  ngOnInit(){
    this.themeService.changeTheme("dark"); // change theme
    this.menuService.onItemClick().subscribe((e) => {
        if (e.item.title == 'Home'){
          const queryParams: Params = { };
          this.router.navigate(['/pages/home'],
          { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
      }
    );
  }
}
