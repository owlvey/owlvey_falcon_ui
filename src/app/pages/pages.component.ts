import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from "@nebular/theme";

import { MENU_ITEMS } from './pages-menu';
import { ActivatedRoute, Router } from '@angular/router';

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
export class PagesComponent implements OnInit {  
  menu = MENU_ITEMS;
  constructor(private menuService: NbMenuService,private router: Router, activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(){
    this.menuService.onItemClick().subscribe((e) => {
      let currentCustomer = JSON.parse(sessionStorage.getItem("currentCustomer"));
      let currentProduct = JSON.parse(sessionStorage.getItem("currentProduct"));
      if (!currentCustomer || !currentProduct){
        return;
      }
      else{
        if (e.item.title == "Sources"){          
          this.router.navigateByUrl(`/pages/customers/${currentCustomer.id}/products/${currentProduct.id}/sources`);
        }
        if (e.item.title == "Products"){          
          this.router.navigateByUrl(`/pages/customers/${currentCustomer.id}/products/${currentProduct.id}`);
        }
        if (e.item.title == "Customers"){          
          this.router.navigateByUrl(`/pages/customers`);
        }
      }      
    });
  }
}
