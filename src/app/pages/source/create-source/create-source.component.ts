import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
@Component({
  selector: 'app-create-source',
  templateUrl: './create-source.component.html',
  styleUrls: ['./create-source.component.scss']
})
export class CreateSourceComponent extends ProductBaseComponent {

  createForm: FormGroup;

  optionsValue = "Interaction";

  options = [
    { value: 'Interaction', label: 'Interaction' },
    { value: 'Proportion', label: 'Proportion'},        
  ];

  groupOptions = [
    {value: 'Availability', label: 'Availability' },
    {value: 'Latency', label: 'Latency' },
    {value: 'Experience', label: 'Experience' }
  ];
  groupValue = "Availability"; 
  
  constructor(
    protected location: Location, private fb: FormBuilder, protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway, protected theme: NbThemeService, protected router: Router,
    protected activatedRoute: ActivatedRoute, 
    private toastr: NbToastrService, private sourceGateway: SourcesGateway ) {
    super(location, customerGateway, productGateway, theme, router, activatedRoute);
    this.createForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],      
    });
    this.isLoading = false;
  }

  onSubmit() {
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }
    this.isLoading = true;
    const model = this.createForm.value;
    let  defer = this.sourceGateway.postSource(this.productId, model.name, this.optionsValue, this.groupValue);
    defer.subscribe((data) => {
        this.toastr.success("Source Created Success");
        this.isLoading = false;
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
