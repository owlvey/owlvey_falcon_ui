import { Component, EventEmitter, Input, OnDestroy, Output, OnInit, ElementRef, ViewChild, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbSelectComponent } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { ProductsGateway } from './../../../@core/data/products.gateway';
import { ActivatedRoute, Route, Router, ParamMap, Params } from '@angular/router';
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
  startDate: Date; 
  endDate: Date;  

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
  refresh : any= new Date().getTime();

  @ViewChildren(NbSelectComponent) headerSelectors: QueryList<any>;

  @ViewChild(NbSelectComponent, { static: false }) otherCustomerSelect: any;

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
  }

  onFirstLoadWithOutData(){
    this.currentCustomer = null;
    this.currentProduct = null;
    this.customerGateway.getCustomers().subscribe(data=>{
      this.customers = data;            
      this.products = null;            
    });
  }
  onCustomerAndProduct(custId, prodId){    
    this.customerGateway.getCustomers().subscribe(data=>{
      this.customers = data;           
      this.cdRef.detectChanges();            
      this.currentCustomer = custId;
      this.productGateway.getProducts(custId).subscribe(products=>{
        this.products = products;        
        this.cdRef.detectChanges();            
        this.currentProduct = prodId;                
      });
    });
  }
  onCustomer(custId){
    this.customerGateway.getCustomers().subscribe(data=>{
      this.customers = data;           
      this.cdRef.detectChanges();            
      this.currentCustomer = custId;
      this.productGateway.getProducts(custId).subscribe(products=>{
        this.products = products;    
        this.currentProduct = null;                            
      });
    });
  }
  onNavigation(){
    const snapshot = this.activatedRoute.snapshot.queryParamMap;            
    const qcustomerId = parseInt(snapshot.get('customerId'));         
    const qproductId = parseInt(snapshot.get('productId'));                
    if(!qcustomerId) {
      this.onFirstLoadWithOutData();
    }
    else if(qcustomerId && qproductId){
      this.onCustomerAndProduct(qcustomerId, qproductId);        
    }
    else {
      this.onCustomer(qcustomerId);
    }    
  }

  onChangeRoute(){
    this.refresh = new Date().getTime();
    this.onNavigateRoute();
  }
  onNavigateRoute(){
    let target = [this.router.url.split('?')[0]];
    let queryParams: Params = { 
      customerId: this.currentCustomer, 
      productId: this.currentProduct,
      start: this.startDate.toISOString(), 
      end: this.endDate.toISOString(),
    };    
    this.router.navigate(target, { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                                    
      if (this.refresh !== parseInt(paramMap.get("refresh"))){        
        this.onNavigateRoute();
      }      
    });    
  }
  ngOnInit() {                 
    const snapshot = this.activatedRoute.snapshot.queryParamMap;            
    this.endDate = new Date();
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 365);       
    
    this.onNavigation();

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
/*
  getProducts() {
    this.productGateway.getProducts(this.currentCustomer).subscribe(data => {      
      this.products = data;
      setTimeout(() => {        
        this.headerSelectors.forEach(c=>{        
          if (c.placeholder === "products")
          { 
            c.setSelection(this.currentProduct);
          }
        });      
      }, 100);
    });
  } 
*/
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeCustomer(customer: any) {                
    this.currentProduct = null; 
    this.productGateway.getProducts(customer).subscribe(data=>{
      this.products=data;
      this.onChangeRoute();      
    });
    
  }

  changeProduct(product: any) {               
    this.onChangeRoute();      
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
  onStartChange(start: Date){    
    this.onChangeRoute();      
  }
  onEndChange(end: Date){           
    this.onChangeRoute();      
  }
}
