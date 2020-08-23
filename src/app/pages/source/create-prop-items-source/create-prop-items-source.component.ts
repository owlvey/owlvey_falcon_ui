import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormatService } from '../../../@core/utils/format.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'create-ava-prop-items-source',
  templateUrl: './create-prop-items-source.component.html',
  styleUrls: ['./create-prop-items-source.component.scss']
})
export class CreatePropItemsSourceComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;
  currentSource: any;
  productId = 0;
  customerId = 0;
  sourceId: number;

  editForm: FormGroup;
  group: string;
  source: LocalDataSource = new LocalDataSource();
  startDate: Date;
  endDate: Date;
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private router: Router,
    private toastr: NbToastrService,
    private fb: FormBuilder,
    private formatService: FormatService,
    private activatedRoute: ActivatedRoute) {

    }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.productId = parseInt(paramMap.get('productId'));
      this.customerId = parseInt(paramMap.get('customerId'));
      this.sourceId = parseInt(paramMap.get('sourceId'));
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));
      this.group = paramMap.get("group");

    });

    var d = new Date();
    d.setDate(d.getDate()-30);

    this.editForm = this.fb.group({
      sourceId: [this.sourceId , Validators.required],
      measure: [0.8, Validators.required],
      start: [(d).toJSON().slice(0,10), Validators.required],
      end: [(new Date()).toJSON().slice(0,10), Validators.required]
    });
  }

  onBackClick(event){
    this.location.back();
  }

  onSubmit() {
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }
    this.isLoading = true;
    const model = this.editForm.value;
    let  defer;
    if (this.group == "Availability"){
      defer = this.sourcesGateway.postAvailabilitySourceItem(model);
    }
    else{
      defer = this.sourcesGateway.postExperienceSourceItem(model);
    }

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
