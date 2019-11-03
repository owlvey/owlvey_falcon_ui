import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import 'rxjs/Rx' ;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { ProductsGateway } from '../../../@core/data/products.gateway';

@Component({
  selector: 'app-list-export',
  templateUrl: './list-export.component.html',
  styleUrls: ['./list-export.component.scss']
})
export class ListExportComponent extends ProductBaseComponent {  
  loading: boolean = false;   
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }     

    onExportPowerBI(){
      this.productGateway.exportToExcel(this.productId, this.startDate, this.endDate).subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);

        var anchor = document.createElement("a");
        var body = document.getElementsByTagName('body')[0];
        anchor.download = this.currentCustomer.name + "-" + this.currentProduct.name + "-excel.xlsx";
        anchor.href = url;
        anchor.target = "_blank";
        body.appendChild(anchor);
        anchor.click();
        body.removeChild(anchor);
      });
    }
  
   
   
}
