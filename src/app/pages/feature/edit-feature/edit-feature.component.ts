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
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss']
})
export class EditFeatureComponent extends ProductBaseComponent {

  editForm: FormGroup;
  isLoading: boolean = false;
  settings = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:false,
      delete:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      perPage: 5
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      source: {
        title: 'Source',
        type: 'string',
        filter: true
      },
      availability: {
        title: 'Availability',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  newSettings = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:true,
      delete:false
    },
    edit: {
      editButtonContent: '<i class="nb-plus"></i>'
    },
    pager: {
      perPage: 5
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
        title: 'Source',
        type: 'string',
        filter: true
      }
    },
  };

  newSource: LocalDataSource = new LocalDataSource();



  squadSettings = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:false,
      delete:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      perPage: 20
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      }
    },
  };

  newSquadSettings = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:true,
      delete:false
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
        filter: false,
        width: '3em',
        editable: false
      },
      name: {
        title: 'Source',
        type: 'string',
        filter: false
      }
    },
  };
  squadsSource: LocalDataSource = new LocalDataSource();
  newSquadSource: LocalDataSource = new LocalDataSource();


  constructor(
    protected location: Location, private fb: FormBuilder, protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected theme: NbThemeService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected eventHandler: EventHandlerService,
    protected portfolioGateway: PortfoliosGateway,
    protected sourceGateway: SourcesGateway,
    protected toastr: NbToastrService,
    protected featureGateway: FeaturesGateway ) {
    super(location, customerGateway, productGateway, theme, router, activatedRoute);
    this.isLoading = false;
  }

  private featureId: number;

  onChangeQueryParameters(paramMap: ParamMap): void {
    this.featureId = parseInt(paramMap.get('featureId'));
    super.onChangeQueryParameters(paramMap);
    this.loadViewState();
  }

  loadViewState(){
    this.loadSource();
    this.loadSLIs();
    this.loadSquads();
  }

  loadSource(){
    this.featureGateway.getFeatureWithAvailabilities(this.featureId, this.startDate, this.endDate).subscribe(data=>{
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("name").setValue(data.name);
      this.editForm.get("description").setValue(data.name);
      this.editForm.get("avatar").setValue(data.avatar);
      this.editForm.get("mttd").setValue(data.mttd);
      this.editForm.get("mttr").setValue(data.mttr);
      this.source.load(data.indicators);
      this.squadsSource.load(data.squads);
    });
  }

  loadSquads(){
    this.featureGateway.getSquadsComplement(this.featureId).subscribe(data=>{
      this.newSquadSource.load(data);
    });
  }

  loadSLIs(){
    this.featureGateway.getIndicatorsComplement(this.featureId).subscribe(data=>{
      this.newSource.load(data);
    });
  }

  onRegister(event){
    const sourceId = event.data.id;
    this.featureGateway.postIndicator(this.featureId, sourceId).subscribe(data=>{
      this.toastr.success("Feature Registered");
      this.loadSource();
      this.loadSLIs();
    });
  }
  onRegisterSquad(event){
    const squadId = event.data.id;
    this.featureGateway.putSquad(this.featureId, squadId).subscribe(data=>{
      this.loadViewState();
    });
  }
  onUnRegister(event){
    const indicatorId = event.data.id;
    this.featureGateway.deleteIndicator(indicatorId).subscribe(data=>{
      this.loadViewState();
    });
  }

  onUnRegisterSquad(event){
    const squadId = event.data.id;
    this.featureGateway.deleteSquad(this.featureId, squadId).subscribe(data=>{
      this.loadViewState();
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
