import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { NbThemeService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CustomerBaseComponent } from './base-customer.component';

export class ProductBaseComponent extends CustomerBaseComponent {
    public currentProduct : any = {};
    public productId : number;     
    
    constructor(
        protected location: Location,
        protected customerGateway: CustomersGateway,        
        protected productGateway: ProductsGateway,        
        protected theme: NbThemeService,
        protected router: Router, 
        protected activatedRoute: ActivatedRoute) {       
          super(location, customerGateway, theme, router, activatedRoute);
        }        
    onChangeQueryParameters(paramMap: ParamMap): void {           
        this.productId = parseInt(paramMap.get('productId'));                                
        super.onChangeQueryParameters(paramMap);        
        this.loadProduct();
    }
    onNgOnInit(): void {
        
    }    
    public loadProduct(){
        if (this.productId){
            this.productGateway.getProduct(this.productId).subscribe(data=>{
                this.currentProduct = data;
            });
        }else{
            alert('please select a product');
            this.goHome();
        }        
    }

    goBack(){
        this.location.back();
    }

}