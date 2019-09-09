import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { EventHandlerService } from '../../../../../src/app/event-handler.service';

@Component({
  selector: 'ngx-create-product-squad',
  templateUrl: './create-product-squad.component.html',
  styleUrls: ['./create-product-squad.component.scss']
})
export class CreateProductSquadComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  customerId: any;
  squad: any = {};
  squadId: any;
  products: any[];
  squadName: string = '';

  createForm: FormGroup;
  formTitle: string;
  constructor(
    private location: Location,
    private squadGateway: SquadsGateway,
    private productGateway: ProductsGateway,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      productId: ['', Validators.required],
      squadId: ['', Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = parseInt(paramMap.get('customerId'));
      this.squadId = parseInt(paramMap.get('squadId'));
      this.createForm.get('squadId').setValue(this.squadId);
      this.onLoadSquad();
      this.onLoadProducts();
    });
  }

  goBack() {
    this.location.back();
  }

  onLoadProducts() {

    this.productGateway.getProducts(this.customerId).subscribe(products=>{
      this.products = products;
    });

  }

  onLoadSquad() {

    this.squadGateway.getSquad(this.squadId).subscribe(squad=>{
      this.squadName = squad.name;
    });

  }

  onSubmit() {
    console.log(this.createForm)
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }

    this.isLoading = true;
    let  defer = this.squadGateway.createSquadProduct(this.createForm.value);
    defer.subscribe((data) => {
        this.toastr.success("Product Associated Success");
        this.isLoading = false;
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }

}
