import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';

@Component({
  selector: 'app-create-sync',
  templateUrl: './create-sync.component.html',
  styleUrls: ['./create-sync.component.scss']
})
export class CreateSyncComponent extends ProductBaseComponent {

  isLoading: boolean = false;  
  actionConfirmWord: string;

  sync: any = {};
  
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
      super(location, customerGateway, productsGateway, theme, router, activatedRoute);
      this.createForm = this.fb.group({        
        name: ['', Validators.required]
      });
      this.isLoading = false;
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
    let  defer = this.productsGateway.postSync(this.productId, this.createForm.value.name);
    defer.subscribe((data) => {
        this.toastr.success("Synchronization alias created");
        this.isLoading = false;        
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
