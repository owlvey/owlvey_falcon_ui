import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { debugOutputAstAsTypeScript } from '@angular/compiler';


@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.scss']
})
export class CreatePortfolioComponent extends ProductBaseComponent {  

  isLoading: boolean = false;  
  actionConfirmWord: string;
  createForm: FormGroup;

  constructor(
    protected location: Location,
    protected portfolioGateway: PortfoliosGateway,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected toastr: NbToastrService,
    protected theme: NbThemeService,
    protected router: Router, 
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);      
      this.isLoading = false;
    } 
    onChangeQueryParameters(paramMap: ParamMap): void {        
      super.onChangeQueryParameters(paramMap);
      this.createForm = this.fb.group({
        productId: this.productId,
        name: ['', Validators.required]
      });      
    }

    onSubmit() {    
      if (!this.createForm.valid) {
        this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
        return;
      }  
      this.isLoading = true;            
      let  defer = this.portfolioGateway.postPortfolio(this.createForm.value);
      defer.subscribe((data) => {
          this.toastr.success("Product Created Success");
          this.isLoading = false;          
          this.location.back();
        }, (error) => {
          this.isLoading = false;
          this.toastr.warning("Something went wrong, please try again.", "Warning")
        });
    }  
}