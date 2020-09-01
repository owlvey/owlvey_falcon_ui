import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { RisksGateway } from '../../../@core/data/risks.gateway';


@Component({
  selector: 'app-list-risk',
  templateUrl: './list-risk.component.html',
  styleUrls: ['./list-risk.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListRiskComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  customerId: any;
  squads: any[];
  themeSubscription: any;

  securitySettings = {
    mode: 'external',
    columns: {
      name: {
        title: 'Risk Name',
        type: 'string',
        filter: false,
      },
      source:{
        title: 'Source Name',
        type: 'string',
        filter: false,
      },
      risk:{
        title: 'Risk',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      likeHood:{
        title: 'Likehood',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      impact:{
        title: 'Impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      tags:{
        title: 'Tags',
        type: 'number',
        filter: false,
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  securitySource: LocalDataSource = new LocalDataSource();


  reliabilitySettings = {
      mode: 'external',
      pager: {
        perPage: 5
      },
      columns: {
        name: {
          title: 'Name',
          type: 'string',
          filter: true,
        },
        ettr:{
          title: 'ETTR',
          type: 'number',
          width: '2em',
          sort:true,
          filter: true,
        },
        userImpact:{
          title: 'User Impact',
          type: 'number',
          width: '2em',
          sort:true,
          filter: true,
        },
        ettFail:{
          title: 'Time To Fail',
          type: 'number',
          width: '2em',
          sort:true,
          filter: true,
        },
        incidentsPerYear : {
          title: 'Incidents Per Year',
          type: 'number',
          width: '2em',
          sort:true,
          filter: true,
        },
        badMinutesPerYear  : {
          title: 'Bad Minutes Per Year',
          type: 'number',
          width: '2em',
          sort:true,
          filter: true,
        },
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
    };

  reliabilitySource: LocalDataSource = new LocalDataSource();


  constructor(
    protected location: Location,
    protected theme: NbThemeService,
    protected router: Router,
    private toastr: NbToastrService,
    private riskGateway: RisksGateway,
    protected activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getSecurityRisks();
    this.getReliabilityRisks();
  }
  getReliabilityRisks(){
    this.riskGateway.getReliabilityRisks().subscribe(data => {
      this.reliabilitySource.load(data);
    });
  }
  onReliablityRowSelect(item){
    const riskId = item.data.id;
    const queryParams: Params = { riskId: riskId};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/risks/reliability/detail'], extras);
  }
  onCreateSecurity(event){

  }
  onCreateReliability(event){

  }
  getSecurityRisks() {
    this.riskGateway.getSecurityRisks().subscribe(data => {
      this.securitySource.load(data);
    });
  }
  onSecurityThreatRowSelect(item) {
    const riskId = item.data.id;
    const queryParams: Params = { riskId: riskId};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/risks/security/detail'], extras);
  }
}
