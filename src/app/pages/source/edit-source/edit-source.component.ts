import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventHandlerService } from '../../../../../src/app/event-handler.service';
import { SourcesGateway } from '../../../@core/data/sources.gateway';


@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.scss']
})
export class EditSourceComponent extends ProductBaseComponent {

  editForm: FormGroup;

  constructor(
    protected location: Location, private fb: FormBuilder, protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway, protected theme: NbThemeService, protected router: Router,
    protected activatedRoute: ActivatedRoute, private eventHandler: EventHandlerService,
    private toastr: NbToastrService, private sourceGateway: SourcesGateway ) {
    super(location, customerGateway, productGateway, theme, router, activatedRoute);

    this.isLoading = false;
  }
  private sourceId: number;
  onChangeQueryParameters(paramMap: ParamMap): void {
    this.sourceId = parseInt(paramMap.get('sourceId'));
    super.onChangeQueryParameters(paramMap);
    this.loadSource();
  }

  loadSource(){
    this.sourceGateway.getSource(this.sourceId).subscribe(data=>{
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("name").setValue(data.name);
      this.editForm.get("avatar").setValue(data.avatar);
      this.editForm.get("goodDefinition").setValue(data.goodDefinition);
      this.editForm.get("totalDefinition").setValue(data.totalDefinition);
    });
  }

  onNgOnInit(){
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      goodDefinition: ['', Validators.required],
      totalDefinition: ['', Validators.required]
    });
  }
  onSubmit() {
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }
    this.isLoading = true;
    const model = this.editForm.value;
    let  defer = this.sourceGateway.putSource(this.sourceId, model);
    defer.subscribe((data) => {
        this.toastr.success("Source Modified Success");
        this.isLoading = false;
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
