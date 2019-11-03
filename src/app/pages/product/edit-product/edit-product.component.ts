import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'ngx-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;

  product: any = {};
  customerId = 0;
  productId = 0;
  editForm: FormGroup;
  formTitle: string;

  constructor(
    private location: Location,
    private productsGateway: ProductsGateway,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,    
    private activatedRoute: ActivatedRoute) {
      this.editForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        avatar: ['', Validators.required],
        leaders: [''],
      });
      this.isLoading = false;
    }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = parseInt(paramMap.get('customerId'));
      this.productId = parseInt(paramMap.get('productId'));      
      this.getProduct();
    });
  }

  goBack() {
    this.location.back();
  }

  getProduct(){
    this.productsGateway.getProduct(this.productId).subscribe(data => {
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("name").setValue(data.name);
      this.editForm.get("description").setValue(data.description);
      this.editForm.get("avatar").setValue(data.avatar);
      this.editForm.get("leaders").setValue(data.leaders);
    });
  }

  onSubmit() {
    console.log(this.editForm);
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }

    this.isLoading = true;    
    let defer = this.productsGateway.updateProduct(this.productId, this.editForm.value);
    defer.subscribe((data) => {
      this.toastr.success("Product Updated Success", "Success");
      this.isLoading = false;      
      this.location.back();
    }, (error) => {
      this.isLoading = false;
      this.toastr.warning("Something went wrong, please try again.", "Warning")
    });
  }

}
