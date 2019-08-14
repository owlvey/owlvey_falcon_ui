import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { EventHandlerService } from '../../../event-handler.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  customer: any = {};
  customerId = 0;

  createForm: FormGroup;
  formTitle: string;
  type: string;

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      avatar: [''],
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.loadCustomerInfo();
  }

  loadCustomerInfo() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      if (this.activatedRoute.snapshot.params && this.activatedRoute.snapshot.params.customerId !== "create") {
        this.getCustomer(this.activatedRoute.snapshot.params.customerId);
      } else {
        this.formTitle = "Create Customer";
        this.type = "create"
      }
    });
  }

  getCustomer(customerId: number) {
    this.customerGateway.getCustomer(customerId).subscribe(data => {
      this.createForm.get("id").setValue(data.id);
      this.createForm.get("name").setValue(data.name);
      this.createForm.get("avatar").setValue(data.avatar);
      this.formTitle = `Edit Customer - ${data.name}`;
      this.type = "update"
    });
  }

  goBack() {
    this.router.navigate(['/pages/customers']);
  }

  onSubmit() {
    console.log(this.createForm)
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }

    let defer = null;

    this.isLoading = true;
    if (this.type === "create")
      defer = this.customerGateway.createCustomer(this.createForm.value);
    else
      defer = this.customerGateway.updateCustomer(this.createForm.get("id").value, this.createForm.value);

    defer
      .subscribe((data) => {
        this.toastr.success(`Customer ${this.type === 'create' ? 'Created' : 'Updated'}`, "Success");
        this.isLoading = false;
        this.eventHandler.event.next({
          name: "reloadCustomers"
        })
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
