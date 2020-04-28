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
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;

  private currentCustomer: number;
  private currentProduct: number;

  constructor(private menuService: NbMenuService, private router: Router, private activatedRoute: ActivatedRoute,
    private themeService: NbThemeService) {

  }

  private onCustomerAndProductMustSelected(){
    console.log(JSON.stringify( this.activatedRoute.snapshot.queryParams));
    alert('please select customer and product');    
    this.router.navigateByUrl('/pages/home');    
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
      
      const currentCustomer =  parseInt(this.getParameterByName("customerId"));
      const currentProduct = parseInt(this.getParameterByName("productId"));
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
      if (e.item.title == 'Groups'){
        if (currentCustomer && currentProduct){
          const queryParams: Params = { group: null };
          this.router.navigate(['/pages/groups'], { relativeTo: this.activatedRoute,
             queryParams: queryParams,
             queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }

      if (e.item.title == 'Services'){
        if (currentCustomer && currentProduct){
          const queryParams: Params = { group: null };
          this.router.navigate(['/pages/portfolios'], { relativeTo: this.activatedRoute,
             queryParams: queryParams,
             queryParamsHandling: 'merge' });
        }
        else{
          this.onCustomerAndProductMustSelected();
        }
      }

      if (e.item.title == 'Members'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/users'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }
      
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

      if (e.item.title == 'Exports'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/exports'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }

      if (e.item.title == 'Organization Performance'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/customers/dashboard'],
         { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });        
      }

      if (e.item.title == 'Home'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/home'],
         { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });        
      }

      if (e.item.title == 'Product Performance'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/products/dashboard'],
         { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });        
      }

      if (e.item.title == 'Operation Performance'){
        const queryParams: Params = { };
        this.router.navigate(['/pages/products/operation'],
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
