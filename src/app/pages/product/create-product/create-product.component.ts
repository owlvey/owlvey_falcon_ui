import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends CustomerBaseComponent {

  isLoading: boolean = false;  
  actionConfirmWord: string;

  product: any = {};
  customerId = 0;

  createForm: FormGroup;
  formTitle: string;

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    private productsGateway: ProductsGateway,
    private fb: FormBuilder,
    protected theme: NbThemeService,
    private toastr: NbToastrService,
    protected router: Router,     
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, theme, router, activatedRoute);
      this.createForm = this.fb.group({
        id: [''],
        name: ['', Validators.required]
      });
      this.isLoading = false;
  }   
  onChangeQueryParameters(paramMap: ParamMap): void {        
    super.onChangeQueryParameters(paramMap);
    
  }  

  goBack() {
    this.location.back();
  }

  onSubmit() {    
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }

    this.isLoading = true;
    let  defer = this.productsGateway.createProduct(this.customerId, this.createForm.value);
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
