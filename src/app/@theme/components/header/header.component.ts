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
  onNavigation(qcustomerId, qproductId){    
    if (this.currentProduct && this.currentProduct === qproductId){
        return;
    }

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
  
  onControlChangeRouter(){    
    let target = [this.router.url.split('?')[0]];
    let queryParams: Params = { 
      uheader: 1,
      customerId: this.currentCustomer, 
      productId: this.currentProduct,
      start: this.startDate.toISOString(), 
      end: this.endDate.toISOString(),
    };    
    this.router.navigate(target, { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                
  }
  
  ngAfterViewInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {         
      //evento from control
      const tmp = parseInt(paramMap.get("uheader"));      
      if (!tmp){        
        const customerId = parseInt(paramMap.get("customerId"));
        const productId = parseInt(paramMap.get("productId"))
        this.onNavigation(customerId, productId);
      }            
    });    
  }  

  ngOnInit() {          
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
    
    const snapshot = this.activatedRoute.snapshot.queryParamMap;                
    const qstart = snapshot.get("start");
    const qend = snapshot.get("end");
    const customerId = parseInt(snapshot.get("customerId"));
    const productId = parseInt(snapshot.get("productId"))
    this.onNavigation(customerId, productId);
    if (!qstart){
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 365);           
      this.endDate = new Date();      
    }
    else{
      this.startDate = new Date(qstart);
      this.endDate = new Date(qend);
    }    
    this.onControlChangeRouter();              
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
      this.onControlChangeRouter();      
    });
    
  }

  changeProduct(product: any) {               
    this.onControlChangeRouter();      
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
    this.onControlChangeRouter();      
  }
  onEndChange(end: Date){               
    this.onControlChangeRouter();      
  }
}
