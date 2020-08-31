import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { RisksGateway } from '../../../@core/data/risks.gateway';


@Component({
  selector: 'app-list-threat',
  templateUrl: './list-threat.component.html',
  styleUrls: ['./list-threat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListThreatComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  customerId: any;
  squads: any[];
  themeSubscription: any;
  reliabilitySettings ={
    mode: 'external',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
      ettd:{
        title: 'Detect',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      ette:{
        title: 'Engage',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      ettf:{
        title: 'Fix',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      ettFail:{
        title: 'Fail Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      userImpact:{
        title: 'Percentage Impacted Users',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      incidentsPerYear:{
        title: 'Incidents Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      badMinutesPerYear :{
        title: 'Bad Minutes Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      tags:{
        title: 'Tags',
        type: 'number',
        filter: true,
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    }
  };
  reliabilitySource: LocalDataSource = new LocalDataSource();

  securitySettings = {
    mode: 'external',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
      threatAgentFactor:{
        title: 'Threat Agent',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      vulnerabilityFactor:{
        title: 'Vulnerability',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      likeHood:{
        title: 'Likehood',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      technicalImpact:{
        title: 'Technical impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      businessImpact:{
        title: 'Business impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      impact:{
        title: 'Impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      risk:{
        title: 'Risk',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
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
  constructor(
    protected location: Location,
    protected theme: NbThemeService,
    protected router: Router,
    private toastr: NbToastrService,
    private riskGateway: RisksGateway,
    protected activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getSecurityThreats();
    this.getReliabilityThreats();
  }

  onCreateSecurity(event){
    let queryParams: Params = {  };
    this.router.navigate(['/pages/threats/security/create'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onCreateReliability(event){
    const queryParams: Params = { };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/threats/reliability/create'], extras);
  }
  getReliabilityThreats(){
    this.riskGateway.getReliabilityThreats().subscribe(data=>{
      this.reliabilitySource.load(data);
    });
  }
  getSecurityThreats() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echartsColors: any = config.variables.echarts;

      this.riskGateway.getSecurityThreats().subscribe(data => {
        this.securitySource.load(data);
      });

    });
  }
  onReliabilityThreatRowSelect(item){
    const threatId = item.data.id;
    const queryParams: Params = { threatId: threatId};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/threats/reliability/detail'], extras);
  }
  onSecurityThreatRowSelect(item) {
    const threatId = item.data.id;
    const queryParams: Params = { threatId: threatId};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/threats/security/detail'], extras);
  }
}
