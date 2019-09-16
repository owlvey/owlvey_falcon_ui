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


@Component({
  selector: 'app-detail-incident',
  templateUrl: './detail-incident.component.html',
  styleUrls: ['./detail-incident.component.scss']
})
export class DetailIncidentComponent  extends ProductBaseComponent {

  incidentId : number;
  incident: any;


  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
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

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,    
    protected incidentGateway: IncidentsGateway,
    protected theme: NbThemeService,
    private datePipe: DatePipe,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }     
  onChangeQueryParameters(paramMap: ParamMap): void {                 
      super.onChangeQueryParameters(paramMap);    
      this.incidentId = parseInt(paramMap.get("incidentId"));          
      this.getIncident();
  }
  onNgOnInit(): void {
      
  } 
  onEditClick(){
    let queryParams: Params = {  };
    this.router.navigate(['/pages/incidents/edit'], { 
      relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' }
    );     
  }
  getIncident(){
    this.incidentGateway.getIncident(this.incidentId).subscribe(data=>{
      data.start = this.datePipe.transform(new Date(data.start), 'yyyy-MM-dd hh:mm:ss')       
      data.end = this.datePipe.transform(new Date(data.end), 'yyyy-MM-dd hh:mm:ss')       
      this.incident = data;
      this.source.load(data.features);
    });
  }
  onUserRowSelect(event){

    let queryParams: Params = { featureId: event.data.id };
        this.router.navigate(['/pages/features/detail'], { 
          relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' }
    );     
  }
}
