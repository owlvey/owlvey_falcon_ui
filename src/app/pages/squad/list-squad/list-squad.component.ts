import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from './../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';


@Component({
  selector: 'app-list-squad',
  templateUrl: './list-squad.component.html',
  styleUrls: ['./list-squad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListSquadComponent extends CustomerBaseComponent {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  customerId: any;

  settings = {
    mode: 'external',
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      features:{
        title: 'Features',
        type: 'number',
        filter: false,
      },
      points: {
        title: 'Points',
        type: 'number',
        filter: false,
        width: '3em'
      },
      members:{
        title: 'Members',
        type: 'number',
        filter: false,
        width: '3em'
      }

    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    private squadGateway: SquadsGateway,
    protected theme: NbThemeService,
    protected router: Router, 
    private toastr: NbToastrService,
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, theme, router, activatedRoute);
    }      

  onChangeQueryParameters(paramMap: ParamMap): void {       
    super.onChangeQueryParameters(paramMap);  
    this.getSquads();    
  }
  onNgOnInit(): void {
      
  }
  getSquads() {
    this.squadGateway.getSquadsWithPoints(this.customerId, this.startDate, this.endDate).subscribe(data => {
      this.source.load(data);
    });
  }

  deleteSquad(item: any) {
    this.squadGateway.deleteSquad(item.id)
      .subscribe((data) => {
       //  this.getSquads();
      }, (error) => {
        this.toastr.danger('Something went wrong. Please try again.');
      })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteSquad(event.data)
    } else {
      event.confirm.reject();
    }
  }

  onGraph(event){
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/squads/graph'], extras);
  }

  onCreate(event) {
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/squads/create'], extras);
  }
  
  onSquadRowSelect(event) {
    const squadId = event.data.id;
    const queryParams: Params = { squadId: squadId, uheader: null };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/squads/detail'], extras);
  }
}
