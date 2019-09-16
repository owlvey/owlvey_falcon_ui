import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { IncidentsGateway } from '../../../@core/data/incident.gateway';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.scss']
})
export class EditIncidentComponent  extends ProductBaseComponent {
  editForm: FormGroup;
  isLoading: boolean = false;
  incidentId : number;
  incident: any;


  settings = {    
    mode: 'external',
    actions:{
      columnTitle:'Delete',
      width: '3em',
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
        filter: true,
        width: '3em',
        editable: false
      },    
      name: {
        title: 'Name',
        type: 'string',
        filter: true
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
        filter: true
      },          
    },
  };

  newSource: LocalDataSource = new LocalDataSource();

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,    
    protected incidentGateway: IncidentsGateway,
    private fb: FormBuilder,
    protected theme: NbThemeService,
    private datePipe: DatePipe,
    protected router: Router, 
    protected toastr: NbToastrService,
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
      this.isLoading = false;
      this.editForm = this.fb.group({
        id: '',
        title: ['', Validators.required],
        description: ['', Validators.required],
        start: ['', Validators.required],        
        affected: ['', Validators.required],      
        ttd: ['', Validators.required],      
        tte: ['', Validators.required],      
        ttf: ['', Validators.required],      
        url: ['', Validators.required],   
      });
    }     
  onChangeQueryParameters(paramMap: ParamMap): void {                 
      super.onChangeQueryParameters(paramMap);   
      this.incidentId = parseInt(paramMap.get("incidentId"));
      this.getIncident();
  }
  onNgOnInit(): void {    
      
  } 
  getIncident(){
    this.incidentGateway.getIncidentComplement(this.incidentId).subscribe(data=>{
      this.newSource.load(data);
    });
    this.incidentGateway.getIncident(this.incidentId).subscribe(data=>{
      this.source.load(data.features);
      data.start = this.datePipe.transform(new Date(data.start), 'yyyy-MM-dd hh:mm:ss')       
      data.end = this.datePipe.transform(new Date(data.end), 'yyyy-MM-dd hh:mm:ss')       
      this.incident = data;
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("title").setValue(data.title);
      this.editForm.get("description").setValue(data.description);
      this.editForm.get("affected").setValue(data.affected);
      this.editForm.get("ttd").setValue(data.ttd);
      this.editForm.get("tte").setValue(data.tte);      
      this.editForm.get("ttf").setValue(data.ttf);      
      this.editForm.get("start").setValue(data.start);
      this.editForm.get("url").setValue(data.url);
    });
  }
  onSubmit() {
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }
    this.isLoading = true;
    const model = this.editForm.value;
    let  defer = this.incidentGateway.putIncident(this.incidentId, model);
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
    this.incidentGateway.registerFeature(this.incidentId, featureId).subscribe(data=>{
      this.getIncident();
    });
  }
  onDelete(event){
    const featureId = event.data.id;
    this.incidentGateway.unRegisterFeature(this.incidentId, featureId).subscribe(data=>{
      this.getIncident();
    });
  }
}
