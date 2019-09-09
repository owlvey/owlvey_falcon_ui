import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SquadsGateway } from './../../../@core/data/squads.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';


@Component({
  selector: 'app-detail-squad',
  templateUrl: './detail-squad.component.html',
  styleUrls: ['./detail-squad.component.scss']
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
        type: 'string',
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
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },          
      product: {
        title: 'Product',
        type: 'string',
        filter: false,        
        editable: false
      },                
      service: {
        title: 'Service',
        type: 'string',
        filter: false,        
        editable: false
      },          
      slo: {
        title: 'SLO',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },             
      impact: {
        title: 'Impact',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },               
      name: {
        title: 'Feature',
        type: 'string',
        filter: false,        
        editable: false
      },              
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },              
      points: {
        title: 'Points',
        type: 'number',
        filter: false,        
        width: '3em',
        editable: false
      },                    
    },
  };  
    constructor(
      protected location: Location,
      protected customerGateway: CustomersGateway,        
      private squadGateway: SquadsGateway,    
      protected theme: NbThemeService,
      private toastr: NbToastrService,
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
    this.squadGateway.getSquadDetail(this.squadId, this.startDate, this.endDate).subscribe(data=>{
      this.currentSquad = data;  
      this.membersSource.load(data.members); 
      this.source.load(data.features);      
    });
  }
  
  onBackClick(event){
    this.location.back();
  }
  onProductRowSelect(event){
    const productId = event.data.id;
    let queryParams: Params = { squadId: this.squadId, productId: productId, uheader: null };
    this.router.navigate(['/pages/products/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  onUserRowSelect(event){
    const userId = event.data.id;
    let queryParams: Params = { customerId: this.customerId, squadId: this.squadId, userId: userId, uheader: null };
    this.router.navigate(['/pages/users/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  onAddMemberClick(event){
    let queryParams: Params = { squadId: this.squadId, uheader: null };
    this.router.navigate(['/pages/squads/users/create'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  onAsociateProduct(event){
    let queryParams: Params = { squadId: this.squadId, uheader: null };
    this.router.navigate(['/pages/squads/products/asociate'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
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
