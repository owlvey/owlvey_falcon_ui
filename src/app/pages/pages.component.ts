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
  constructor(private menuService: NbMenuService,private router: Router, private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(){
    this.menuService.onItemClick().subscribe((e) => {            
      const currentCustomer = this.activatedRoute.snapshot.queryParams.customerId;
      const currentProduct = this.activatedRoute.snapshot.queryParams.productId;            
      if (e.item.title == "Sources"){                    
        if (currentProduct){
          this.router.navigateByUrl(`/pages/sources?customerId=${currentCustomer}&productId=${currentProduct}`);
        }
        else{
          alert('please select product');          
        }                
      }
      if (e.item.title == "Products"){      
        if (currentCustomer){
          this.router.navigateByUrl(`/pages/products?customerId=${currentCustomer}`);
        }
        else{
          alert('please select customer');          
        }        
      }
      if (e.item.title == "Customers"){          
        this.router.navigateByUrl(`/pages/customers`);
      }            
    });
  }
}
