import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { IncidentsGateway } from '../../../@core/data/incident.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.scss']
})
export class CreateIncidentComponent extends ProductBaseComponent {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  customer: any = {};
  customerId = 0;
  productId = 0;

  createForm: FormGroup;
  formTitle: string;

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,    
    protected incidentGateway: IncidentsGateway,
    protected theme: NbThemeService,
    protected router: Router, 
    private fb: FormBuilder,
    private toastr: NbToastrService,
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);      
    }     
  onChangeQueryParameters(paramMap: ParamMap): void {                 
      super.onChangeQueryParameters(paramMap);              
      this.createForm = this.fb.group({        
        productId: [this.productId],
        title: ["", Validators.required]      
      });
      this.isLoading = false;
  }
  onNgOnInit(): void {
     
  } 
  goBack(){
    this.location.back();
  }
  onSubmit() {
    if (!this.createForm.valid) {
      this.toastr.warning(
        "Please check the form fields are filled correctly.",
        "Warning"
      );
      return;
    }

    this.isLoading = true;
    let defer = this.incidentGateway.postIncident(      
      this.createForm.value
    );
    defer.subscribe(
      data => {
        this.toastr.success("Feature Created Success");
        this.isLoading = false;        
        
        let queryParams: Params = { incidentId: data.id };
        this.router.navigate(['/pages/incidents/edit'], { 
          relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' }
        );     

      },
      error => {
        this.isLoading = false;
        this.toastr.warning(
          "Something went wrong, please try again.",
          "Warning"
        );
      }
    );
  }
}
