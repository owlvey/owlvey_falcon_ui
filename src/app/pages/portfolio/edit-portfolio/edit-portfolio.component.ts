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


@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss']
})
export class EditPortfolioComponent extends ProductBaseComponent {
  
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
    protected sourceGateway: SourcesGateway ) {
    super(location, customerGateway, productGateway, theme, router, activatedRoute);    
    this.isLoading = false;
  } 
  private portfolioId: number;   
  onChangeQueryParameters(paramMap: ParamMap): void {
    this.portfolioId = parseInt(paramMap.get('portfolioId'));                                
    super.onChangeQueryParameters(paramMap);
    this.loadSource();
  }

  loadSource(){
    this.portfolioGateway.getPortfolio(this.portfolioId).subscribe(data=>{
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("name").setValue(data.name);
      this.editForm.get("avatar").setValue(data.avatar);
      this.editForm.get("slo").setValue(data.slo);      
    });
  }

  onNgOnInit(){
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      slo: ['', Validators.required],              
    });
  }
  onSubmit() {    
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }    
    this.isLoading = true;    
    const model = this.editForm.value;
    let  defer = this.portfolioGateway.putPortfolio(this.portfolioId, model);
    defer.subscribe((data) => {
        this.toastr.success("Portfolio Modified Success");
        this.isLoading = false;        
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
