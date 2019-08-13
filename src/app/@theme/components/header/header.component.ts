import { Component, EventEmitter, Input, OnDestroy, Output, OnInit, ElementRef, ViewChild, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbSelectComponent } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { ProductsGateway } from './../../../@core/data/products.gateway';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventHandlerService } from '../../../event-handler.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  customers: Array<any> = [];
  products: Array<any> = [];

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

  @ViewChild(NbSelectComponent, { static: false }) otherCustomerSelect: any;

  ngAfterViewInit(): void {

  }

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private eventHandler: EventHandlerService
  ) {
    this.currentCustomer = this.activatedRoute.snapshot.params.customerId;
    this.currentProduct = this.activatedRoute.snapshot.params.productId;
    this.eventHandler.event.subscribe((event) => {
      if (event) {
        if (event.name == "reloadCustomers") {
          this.getCustomers();
        }
      }
    })
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


  getCustomers() {
    this.customerGateway.getCustomers().subscribe(data => {
      this.customers = data;
      this.cdRef.detectChanges();
      if (this.currentCustomer) {
        this.setCustomer(data.find(x => x.id == this.currentCustomer));
      }
      else {
        this.setCustomer(data[0]);
      }
    });
  }
  getProducts() {
    this.productGateway.getProducts(this.currentCustomer).subscribe(data => {
      this.products = data;
      setTimeout(() => {
        if (this.currentProduct) {
          this.setProduct(data.find(x => x.id == this.currentProduct));
        }
        else {
          this.setProduct(data[0]);
        }
      }, 100);
    });
  }

  private setCustomer(customer) {
    this.currentCustomer = customer.id;
    sessionStorage.setItem("currentCustomer", JSON.stringify(customer));
    this.getProducts()
  }
  private setProduct(product) {
    this.currentProduct = product.id;
    sessionStorage.setItem("currentProduct", JSON.stringify(product));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeCustomer(customer: any) {
    this.router.navigate([`/pages/customers/${customer}`], {
      queryParams: { refresh: new Date().getTime() }
    });
  }

  changeProduct(product: any) {
    this.router.navigate([`/pages/customers/${this.currentCustomer}/products/${product}`], {
      queryParams: { refresh: new Date().getTime() }
    });

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
