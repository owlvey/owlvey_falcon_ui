import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { EventHandlerService } from '../../../event-handler.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  product: any = {};
  customerId = 0;

  createForm: FormGroup;
  formTitle: string;
  constructor(
    private location: Location,
    private productsGateway: ProductsGateway,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,
    private eventHandler: EventHandlerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = parseInt(paramMap.get('customerId'));
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.createForm)
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }

    this.isLoading = true;
    let  defer = this.productsGateway.createProduct(this.customerId, this.createForm.value);
    defer.subscribe((data) => {
        this.toastr.success("Product Created Success");
        this.isLoading = false;
        this.eventHandler.event.next({ name: "reloadProducts" })
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
