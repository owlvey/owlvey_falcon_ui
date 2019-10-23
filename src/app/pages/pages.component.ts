import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbThemeService } from '@nebular/theme';

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
  constructor(private menuService: NbMenuService, private router: Router, private activatedRoute: ActivatedRoute,
    private themeService: NbThemeService) {

  }

  private onCustomerAndProductMustSelected(){
    alert('please select customer and product');
    const queryParams: Params = {  };
    this.router.navigate(['/pages/home'], { relativeTo: this.activatedRoute, queryParams: queryParams });
  }

  ngOnInit(){
    //this.themeService.changeTheme("dark"); // change theme
    this.menuService.onItemClick().subscribe((e) => {      
      const currentCustomer = this.activatedRoute.snapshot.queryParams.customerId;
      const currentProduct = this.activatedRoute.snapshot.queryParams.productId;
      if (e.item.title == 'Sources'){
        if (currentProduct && currentCustomer){
          const queryParams: Params = {  };
          this.router.navigate(['/pages/sources'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }
      if (e.item.title == 'Products'){
        if (currentCustomer){
          const queryParams: Params = { };
          this.router.navigate(['/pages/products'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }
      if (e.item.title == 'Services'){
        if (currentCustomer && currentProduct){
          const queryParams: Params = { };
          this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }

      if (e.item.title == 'Members'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/users'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }

      //uheader
      if (e.item.title == 'Features'){
        if (currentProduct && currentCustomer){
          const queryParams: Params = { };
          this.router.navigate(['/pages/features'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }

      if (e.item.title == 'Incidents'){
        if (currentProduct && currentCustomer){
          const queryParams: Params = { };
          this.router.navigate(['/pages/incidents'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }

      if (e.item.title == 'Organizations'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/customers'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }
      if (e.item.title == 'Migrations'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/migrations'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }

      if (e.item.title == 'Product Dashboard'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/products/dashboard'],
         { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }

      if (e.item.title == 'Squads'){                
        if (currentCustomer){
          const queryParams: Params = { };
          this.router.navigate(['/pages/squads'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });

        } else{
          this.onCustomerAndProductMustSelected();
        }
      }
      if (e.item.title == 'Sync'){        
        if (currentProduct && currentCustomer){
          const queryParams: Params = {  };
          this.router.navigate(['/pages/sync'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }
    });
  }
}
