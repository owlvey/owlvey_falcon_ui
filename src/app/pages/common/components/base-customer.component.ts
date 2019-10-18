import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseComponent } from './base-component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { NbThemeService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export class CustomerBaseComponent extends BaseComponent {
    
    public currentCustomer : any = {};
    public customerId : number; 

    constructor(
        protected location: Location,
        protected customerGateway: CustomersGateway,        
        protected theme: NbThemeService,
        protected router: Router, 
        protected activatedRoute: ActivatedRoute) {       
          super(location, theme, router, activatedRoute);
        }        
    onChangeQueryParameters(paramMap: ParamMap): void {        
        this.customerId = parseInt(paramMap.get('customerId'));  
        this.loadCustomer();
    }
    onNgOnInit(): void {
        
    }
    
    public loadCustomer(){
        if (this.customerId){
            this.customerGateway.getCustomer(this.customerId).subscribe(data=>{                
                this.currentCustomer = data;
            });
        } else{
            alert('please select an organization');
            this.goHome();
        }        
    }

}