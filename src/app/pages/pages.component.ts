import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbThemeService } from "@nebular/theme";

import { MENU_ITEMS } from './pages-menu';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
  constructor(private menuService: NbMenuService,private router: Router, private activatedRoute: ActivatedRoute, 
    private themeService: NbThemeService) {
    
  }

  ngOnInit(){
    this.themeService.changeTheme("dark");
    this.menuService.onItemClick().subscribe((e) => {            
      const currentCustomer = this.activatedRoute.snapshot.queryParams.customerId;
      const currentProduct = this.activatedRoute.snapshot.queryParams.productId;            
      if (e.item.title == "Sources"){                    
        if (currentProduct && currentCustomer){
          let queryParams: Params = { };
          this.router.navigate(['/pages/sources'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                          
        }
        else{
          alert('please select customer and product');          
        }                
      }
      if (e.item.title == "Products"){      
        if (currentCustomer){
          let queryParams: Params = { };
          this.router.navigate(['/pages/products'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                                    
        }
        else{
          alert('please select customer');          
        }        
      }
      if (e.item.title == "Features"){      
        if (currentProduct && currentCustomer){
          let queryParams: Params = { };
          this.router.navigate(['/pages/features'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                                              
        }
        else{
          alert('please select customer and product');          
        }                
      }
      if (e.item.title == "Customers"){          
        let queryParams: Params = { };
        this.router.navigate(['/pages/customers'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                                                      
      }            
    });
  }
}
