import { Component, EventEmitter, Input, OnDestroy, Output, OnInit, ElementRef, ViewChild, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef  } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbSelectComponent } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { ProductsGateway } from './../../../@core/data/products.gateway';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  customers: Array<any> =  [];
  products: Array<any> =  [];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';  
  currentCustomer: number;
  currentProduct: number;

  @ViewChildren(NbSelectComponent) customerSelect: QueryList<any>;

  @ViewChild(NbSelectComponent, { static: false})  otherCustomerSelect: any;

  ngAfterViewInit(): void {    
    
  }

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private customerGateway: CustomersGateway,
              private productGateway: ProductsGateway,
              private cdRef:ChangeDetectorRef) {
    
  }

  getCustomers(){
    this.customerGateway.getCustomers().subscribe(data=>{      
      this.customers = data;                  
      this.cdRef.detectChanges();      
      this.setCustomer(data[0]);            
    });
  }
  getProducts(customerId: number){    
    this.productGateway.getProducts(customerId).subscribe(data=>{
      this.products = data;
      setTimeout(() => {
        this.setProduct(data[0]);
      }, 100);
    });
  }  

  private setCustomer(customer){
    this.currentCustomer = customer.id;
    sessionStorage.setItem("currentCustomer", customer);
    this.getProducts(customer.id)
  }
  private setProduct(product){
    this.currentProduct = product.id;
    sessionStorage.setItem("currentProduct", product);    
  }

  ngOnInit() {        
    this.getCustomers();       

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
        
      this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeCustomer(customer: any) {
    this.getProducts(customer);    
  }
  changeProduct(product: any) {
    alert(product);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
