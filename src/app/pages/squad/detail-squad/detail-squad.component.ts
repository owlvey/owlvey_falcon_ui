import { Component, OnInit, ViewChildren, Input, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SquadsGateway } from './../../../@core/data/squads.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { FormatService } from '../../../@core/utils/format.service';
import { BaseComponent } from '../../common/components/base-component';

@Component({
  selector: 'app-detail-squad',
  templateUrl: './detail-squad.component.html',
  styleUrls: ['./detail-squad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailSquadComponent extends CustomerBaseComponent {

  isLoading: boolean = false;    
  actionConfirmWord: string;
  currentSquad: any;  
  squadId = 0;
  series: Array<any> = [];  
  source: LocalDataSource = new LocalDataSource();

  membersSource: LocalDataSource = new LocalDataSource();

  target = "average";
  private _showAll: boolean = true;

  @Input()
  set showAll(event){
    this._showAll = !this._showAll;
       
  }
  get showAll(){
    return this._showAll;
  }
  membersSettings = {
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
      email: {
        title: 'Email',
        type: 'html',
        filter: true,        
        editable: false
      },                
    },
  };
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
      product: {
        title: 'Product',
        type: 'html',
        filter: false,        
        editable: false
      },                
      service: {
        title: 'Service',
        type: 'html',
        filter: false,        
        editable: false
      },                
      name: {
        title: 'Feature',
        type: 'string',
        filter: false,        
        editable: false
      },       
      availabilitySLO: {
        title: 'SLO',
        type: 'html',
        filter: false,        
        width: '3em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },             
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },
      availabilityDebt: {
        title: 'Debt',
        type: 'html',
        filter: false,        
        width: '3em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },
      latencySLO: {
        title: 'SLO',
        type: 'html',
        filter: false,        
        width: '3em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },        
      latency: {
        title: 'Latency',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },             
      latencyDebt: {
        title: 'Debt',
        type: 'html',
        filter: false,        
        width: '3em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },           
      experienceSLO: {
        title: 'SLO',
        type: 'html',
        filter: false,        
        width: '3em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      },          
      experience: {
        title: 'Experience',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },             
      experienceDebt: {
        title: 'Debt',
        type: 'html',
        filter: false,        
        width: '3em',
        editable: false,
        compareFunction:this.format.compareIconNumberColumn,
      }                     
    },
  };  
    constructor(
      protected location: Location,
      protected customerGateway: CustomersGateway,        
      private squadGateway: SquadsGateway,    
      protected theme: NbThemeService,
      private toastr: NbToastrService,
      protected format: FormatService,
      protected router: Router, 
      protected activatedRoute: ActivatedRoute) {       
        super(location, customerGateway, theme, router, activatedRoute);
      }        
  
  onChangeQueryParameters(paramMap: ParamMap){
    this.squadId = parseInt(paramMap.get('squadId'));     
    this.getSquad();
  }
  onNgOnInit(){

  }
  getSquad(){
    this.squadGateway.getSquadDetailQuality(this.squadId, this.startDate, this.endDate).subscribe(data=>{
      this.currentSquad = data;  

      data.members.forEach((e, i) => {
        e.email = `<img src="${e.avatar}" class="avatar avatar-sm mr-2" />${e.email}`;
      });

      data.features.forEach((e, i) => {
        e.product = `<img src="${e.avatar}" class="avatar avatar-sm mr-2" />${e.product}`;
        e.availabilitySLO = this.format.buildAvailabilitySLOColumn(e.slo.availability);
        e.latencySLO = this.format.buildLatencySLOColumn(e.slo.latency);
        e.experienceSLO = this.format.buildExperienceSLOColumn(e.slo.experience);
        e.availabilityDebt = this.format.buildDebtColumnValueSingle(e.debt.availability);
        e.latencyDebt = this.format.buildDebtColumnValueSingle(e.debt.latency);
        e.experienceDebt = this.format.buildDebtColumnValueSingle(e.debt.experience);

        e.availability = e.quality.availability;
        e.latency = e.quality.latency;
        e.experience = e.quality.experience;

        e.service = `<img src="${e.serviceAvatar}" class="avatar avatar-sm mr-2" />${e.service}`;
        if(e.points < 0) {
          e.points = `<i class="fas fa-circle text-danger mr-2" title=${e.points}></i>${e.points}`;
        } else {
          e.points = `<i class="fas fa-circle text-success mr-2" title=${e.points}></i>${e.points}`;
        }
      });

      this.membersSource.load(data.members); 
      this.source.load(data.features);      

    });
  }
  
  onBackClick(event){
    this.location.back();
  }  

  onSquadRowSelect(event){    
    const featureId = event.data.id;
    let queryParams: Params = { featureId: featureId };
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/features/detail'], extras);   
  }

  
  onEditClick(event) {
    let queryParams: Params = {  };
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/squads/edit'], extras);     
  }
  deleteSquad() {
    this.squadGateway.deleteSquad(this.squadId)
      .subscribe((data) => {
        this.location.back();
      }, (error) => {
        this.toastr.danger("Something went wrong. Please try again.", "Error");
      })
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteSquad();
    } else {
      event.confirm.reject();
    }
  }
}
