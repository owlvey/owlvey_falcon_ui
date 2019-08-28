import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventHandlerService } from '../../../../../App/src/app/event-handler.service';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';


@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss']
})
export class EditFeatureComponent extends ProductBaseComponent {
  
  editForm: FormGroup;

  constructor(
    protected location: Location, private fb: FormBuilder, protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway, 
    protected theme: NbThemeService, 
    protected router: Router, 
    protected activatedRoute: ActivatedRoute,
    protected eventHandler: EventHandlerService, 
    protected portfolioGateway: PortfoliosGateway,
    protected toastr: NbToastrService,     
    protected featureGateway: FeaturesGateway ) {
    super(location, customerGateway, productGateway, theme, router, activatedRoute);    
    this.isLoading = false;
  } 
  private featureId: number;   
  onChangeQueryParameters(paramMap: ParamMap): void {
    this.featureId = parseInt(paramMap.get('featureId'));                                
    super.onChangeQueryParameters(paramMap);
    this.loadSource();
  }

  loadSource(){
    this.featureGateway.getFeature(this.featureId).subscribe(data=>{
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("name").setValue(data.name);
      this.editForm.get("description").setValue(data.name);
      this.editForm.get("avatar").setValue(data.avatar);
      this.editForm.get("mttd").setValue(data.mttd);      
      this.editForm.get("mttr").setValue(data.mttr);      
    });
  }

  onNgOnInit(){
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      avatar: ['', Validators.required],
      mttd: ['', Validators.required],              
      mttr: ['', Validators.required],  
    });
  }
  onSubmit() {    
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }    
    this.isLoading = true;    
    const model = this.editForm.value;
    let  defer = this.featureGateway.updateFeature(this.featureId, model);
    defer.subscribe((data) => {
        this.toastr.success("Feature Modified Success");
        this.isLoading = false;        
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
