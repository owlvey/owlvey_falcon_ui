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

  securitySettings = {
    mode: 'external',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
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
  }
  getReliabilityThreats(){

  }
  onCreateSecurity(event){
    let queryParams: Params = {  };
    this.router.navigate(['/pages/threats/security/create'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
  onCreateReliability(event){

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