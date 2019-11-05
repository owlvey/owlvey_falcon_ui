import { Component, OnInit, ViewChildren } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";
import { CustomersGateway } from "../../../@core/data/customers.gateway";
import { SourcesGateway } from "../../../@core/data/sources.gateway";
import { LocalDataSource } from "ng2-smart-table";
import { ProductsGateway } from "../../../@core/data/products.gateway";
import { UsersGateway } from "../../../@core/data/users.gateway";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-detail-user",
  templateUrl: "./detail-user.component.html",
  styleUrls: ["./detail-user.component.scss"]
})
export class DetailUserComponent implements OnInit {
  currentUser: any;
  userId: number;
  isLoading: boolean = false;

  serviceSettings: any = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {      
      customer: {
        title: 'customer',
        type: 'string',
        filter: false,
        width: '20em',
      },  
      product: {
        title: 'product',
        type: 'string',
        filter: false,
        width: '20em',
      },  
      service: {
        title: 'service',
        type: 'string',
        filter: false
      },  
      slo: {
        title: 'slo',
        type: 'number',
        filter: false,
        width: '5em',
      },      
    },
  };

  serviceSource: LocalDataSource = new LocalDataSource();

  productSettings: any = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {      
      customerName: {
        title: 'customer',
        type: 'string',
        filter: false,
        width: '20em',
      },  
      name: {
        title: 'product',
        type: 'string',
        filter: false
      },  
      servicesCount: {
        title: 'services',
        type: 'number',
        filter: false,
        width: '5em',
      },      
    },
  };

  

  productSource: LocalDataSource = new LocalDataSource();

  featureSettings: any ={
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns: {      
      customer: {
        title: 'customer',
        type: 'string',
        filter: false,
        width: '20em',
      },  
      product: {
        title: 'product',
        type: 'string',
        filter: false,
        width: '20em',
      },  
      feature: {
        title: 'feature',
        type: 'string',
        filter: false,        
      },  
      squad: {
        title: 'squad',
        type: 'string',
        filter: false,
        width: '20em',
      },        
    },
  };

  featureSource: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private userGateway: UsersGateway,
    private router: Router,
    private toastr: NbToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.userId = parseInt(paramMap.get("userId"));
      this.userGateway.getUser(this.userId).subscribe(data => {
        this.currentUser = data;
        this.productSource.load(data.products);
        this.serviceSource.load(data.services);
        this.featureSource.load(data.features);
      });
    });
  }
  onEditClick(event) {
    let queryParams: Params = {};
    this.router.navigate(["/pages/users/edit"], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "merge"
    });
  }
  onBackClick(event) {
    this.location.back();
  }
  onDeleteClick(event) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.userGateway.deleteProduct(this.userId).subscribe(
        res => {
          this.toastr.success("User was deleted");
          let queryParams: Params = { userId: null };
          this.router.navigate(["/pages/users"], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: "merge"
          });
        },
        error => {
          this.isLoading = false;
          this.toastr.warning(
            "Something went wrong, please try again.",
            "Warning"
          );
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onProductRowSelect(event){
    const customerId = event.data.customerId;
    const productId = event.data.id;
    let queryParams: Params = { userId: null, customerId: customerId,  productId: productId};
    this.router.navigate(['/pages/products/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  onServiceRowSelect(event){
    const customerId = event.data.customerId;
    const productId = event.data.productId;
    const serviceId = event.data.serviceId;
    let queryParams: Params = { userId: null,  customerId: customerId,  productId: productId, portfolioId: serviceId};
    this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onFeatureRowSelect(event){
    const customerId = event.data.customerId;
    const productId = event.data.productId;
    const featureId = event.data.featureId;
    let queryParams: Params = { userId: null,  customerId: customerId,  productId: productId, featureId: featureId};
    this.router.navigate(['/pages/features/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

}
