import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbSelectComponent } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { ProductsGateway } from './../../../@core/data/products.gateway';
import { ActivatedRoute, Route, Router, ParamMap, Params } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth';
import { UsersGateway } from '../../../@core/data/users.gateway';
import { CustomerEventHub } from '../../../@core/hubs/customer.eventhub';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
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
  refresh: any= new Date().getTime();

  @ViewChildren(NbSelectComponent) headerSelectors: QueryList<any>;

  @ViewChild(NbSelectComponent, { static: false }) otherCustomerSelect: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private authService: NbAuthService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private tokenService: NbTokenService,
    private customerEventHub: CustomerEventHub
  ) {
      let qcustomerId = this.activatedRoute.snapshot.queryParams["customerId"];
      if (qcustomerId){
        this.currentCustomer = parseInt(qcustomerId);
      }
      let qproductId = this.activatedRoute.snapshot.queryParams["productId"];
      if (qproductId){
        this.currentProduct = parseInt(qproductId);
      }
      let qstart = this.activatedRoute.snapshot.queryParams["start"];
      if (qstart){
        this.currentProduct = parseInt(qproductId);
      }
      let qend = this.activatedRoute.snapshot.queryParams["end"];
      if (qstart){
        this.currentProduct = parseInt(qproductId);
      }

      if (!qstart){
        this.startDate = new Date();
        this.startDate.setDate(this.startDate.getDate() - 30); // Policy time
        this.endDate = new Date();
      }
      else{
        this.startDate = new Date(qstart);
        this.endDate = new Date(qend);
      }  
      
  }

  onControlChangeRouter(){
    const target = [this.router.url.split('?')[0]];
    const queryParams: Params = {      
      customerId: this.currentCustomer,
      productId: this.currentProduct,
      start: this.startDate.toISOString(),
      end: this.endDate.toISOString(),
    };
    this.router.navigate(target, { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }


  ngAfterViewInit(): void {
    this.customerGateway.getCustomers().subscribe(data => {
      
      this.customers = data;      
      this.cdRef.detectChanges();      
      if (this.currentCustomer){
        this.headerSelectors.toArray()[1].setSelection(this.currentCustomer);      
        this.products = null;
        this.cdRef.detectChanges();
        this.productGateway.getProducts(this.currentCustomer).subscribe(dproducts=>{
          this.products = dproducts;
          this.cdRef.detectChanges();
          if ( this.currentProduct ){
            this.headerSelectors.toArray()[2].setSelection(this.currentProduct);                
          }
        });        
      }
      this.onControlChangeRouter();      
    });

    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {       

      const custId = parseInt(paramMap.get("customerId"));
      const prodId = parseInt(paramMap.get("productId"));

      if ( this.currentCustomer != custId){
        this.currentCustomer = custId;
        this.productGateway.getProducts(this.currentCustomer).subscribe(data => {
          this.headerSelectors.toArray()[2].disabled = true;
          this.currentProduct = null;
          this.products = data;
          this.headerSelectors.toArray()[2].disabled = false;          
        });
        return;
      }
      if ( this.currentProduct != prodId){
        this.cdRef.detectChanges();
        this.currentProduct = prodId;
      }      
    });
  }

  ngOnInit() {        
   
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable           
        }
      });

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
        
    this.menuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'user-menu'),
      map(({ item: { title } }) => title),
    )
    .subscribe(title => {
      console.log(title);
      if (title === 'Profile') {
        this.router.navigate(['/profile/me']);
      } else {
        this.authService.logout('password');
        this.tokenService.clear();
        this.router.navigate(['/auth/logout']);
      }
    });
  } 
    
    
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeCustomer(customer: any) {    
    this.currentProduct = null;
    this.productGateway.getProducts(customer).subscribe(data => {
      this.products = data;
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
