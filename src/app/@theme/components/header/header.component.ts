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
import { CacheManager } from '../../../@core/data/cache.manager';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent implements OnInit, OnDestroy {

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

  userMenu = [{ title: 'Profile', icon: 'person-outline', pack: 'font-awesome' }, { title: 'Log out', icon: 'log-out' }];

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
    private customerEventHub: CustomerEventHub,
    private cacheManager: CacheManager,    
    private usersGateway: UsersGateway
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
        this.endDate.setDate(this.endDate.getDate() - 2); // One Day Delay
        this.onControlChangeRouter();
      }
      else{
        this.startDate = new Date(qstart);
        this.endDate = new Date(qend);
      }  
      
  }

  onControlChangeRouter(){
    const target = [this.router.url.split('?')[0]];
    const queryParams: Params = {      
      customerId: this.currentCustomer || null,
      productId: this.currentProduct || null,
      start: this.startDate.toISOString(),
      end: this.endDate.toISOString(),
    };
    this.router.navigate(target, { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }


  loadData(){  
    const that = this;
    setTimeout(()=>{      
      that.customerGateway.getCustomers().subscribe(data => {                  
        that.customers = data;      
        that.cdRef.detectChanges();      
        if (that.currentCustomer){
          that.headerSelectors.toArray()[1].setSelection(that.currentCustomer);      
          that.products = null;
          that.cdRef.detectChanges();
          that.productGateway.getProducts(that.currentCustomer).subscribe(dproducts=>{
            that.products = dproducts;
            that.cdRef.detectChanges();
            if ( that.currentProduct ){
              that.headerSelectors.toArray()[2].setSelection(that.currentProduct);                
            }
          });        
        }
        that.onControlChangeRouter();      
      })
    },  1000);         
  }  

  ngOnInit() {        
    this.customerEventHub.customerUpdated.subscribe(c=>{      
      this.loadData();
    }); 

    this.loadData();

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

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          //this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable           
          
          this.usersGateway.getUserIdentity()
            .subscribe((data: any) => {
              this.user = data;
            });
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
    this.loadData();
    this.onControlChangeRouter();
    return false;
  }
  onStartChange(start: Date){
    this.onControlChangeRouter();
  }
  onEndChange(end: Date){
    this.onControlChangeRouter();
  }
}
