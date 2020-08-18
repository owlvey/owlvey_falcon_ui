import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss']
})
export class EditPortfolioComponent extends ProductBaseComponent {

  editForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  
  settings = {
    mode: 'external',
    actions:{
      columnTitle:'Delete',
      width: '3em',
      position: 'right',
      add:false,
      edit:true,
      delete:false,
    },
    edit: {
      editButtonContent: '<i class="nb-trash"></i>'
    },    
    pager: {
      perPage: 20
    },
    columns: {      
      mapId: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },
      id: {
        title: 'FeatureId',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
        editable: false
      },
      availability: {
        title: 'Quality',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },      
    },
  };

  /*
  mttd: {
        title: 'MTTD',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },
      mtte: {
        title: 'MTTE',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },
      mttf: {
        title: 'MTTF',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },
      mttm: {
        title: 'MTTM',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },
  */

  sourceNewFeatures: LocalDataSource = new LocalDataSource();

  newSettings  = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:true,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-plus"></i>'
    },
    pager: {
      perPage: 20
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
        editable: false
      },     
    },
  };


  /*
   mttd: {
        title: 'MTTD',
        type: 'number',
        filter: true,
        width: '10rem',
        editable: false
      },
      mtte: {
        title: 'MTTE',
        type: 'number',
        filter: true,
        width: '10rem',
        editable: false
      },
      mttf: {
        title: 'MTTF',
        type: 'number',
        filter: true,
        width: '10rem',
        editable: false
      },
      mttm: {
        title: 'MTTM',
        type: 'number',
        filter: true,
        width: '10rem',
        editable: false
      },
      */

  constructor(
    protected location: Location, private fb: FormBuilder, protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected theme: NbThemeService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,    
    protected portfolioGateway: PortfoliosGateway,
    protected featureGateway: FeaturesGateway,
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
    this.loadNewFeatures();
  }

  loadSource(){
    this.portfolioGateway.getPortfolioWithAvailabilities(this.portfolioId, this.startDate, this.endDate).subscribe(data=>{
      
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("name").setValue(data.name);
      this.editForm.get("avatar").setValue(data.avatar);
      this.editForm.get("availabilitySLO").setValue(data.availabilitySLO);
      this.editForm.get("latencySLO").setValue(data.latencySLO);
      this.editForm.get("experienceSLO").setValue(data.experienceSLO);
      this.editForm.get("leaders").setValue(data.leaders);      
      this.editForm.get("group").setValue(data.group);      
      this.editForm.get("availabilitySLA").setValue(data.slaValue.availability); 
      this.editForm.get("latencySLA").setValue(data.slaValue.latency); 
      this.source.load(data.features);
    });
  }
  loadNewFeatures(){
    this.featureGateway.getFeaturesUnregistered(this.portfolioId).subscribe(data=>{
      this.sourceNewFeatures.load(data);
    });
  }

  onNgOnInit(){
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      availabilitySLO: ['', Validators.required],
      latencySLO: ['', Validators.required],
      experienceSLO: ['', Validators.required],
      leaders: [''],      
      group: [''],
      availabilitySLA: ['', Validators.required],
      latencySLA: ['', Validators.required],
    });
  }
  onDelete(event){    
    const featureId =  event.data.id;
    this.portfolioGateway.unRegisterFeature(this.portfolioId, featureId).subscribe(data=>{
      this.loadSource();
      this.loadNewFeatures();
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

  onFeaturesRowSelect(event){
    const featureId = event.data.id;
    this.portfolioGateway.registerFeature(this.portfolioId, featureId).subscribe(data=>{
      this.toastr.success("Feature Registered");
      this.loadSource();
      this.loadNewFeatures();
    });
  }
}
