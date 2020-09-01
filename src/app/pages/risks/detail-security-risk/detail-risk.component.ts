import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { RisksGateway } from '../../../@core/data/risks.gateway';
import { SourcesGateway } from 'app/@core/data/sources.gateway';


@Component({
  selector: 'app-detail-security-risk',
  templateUrl: './detail-risk.component.html',
  styleUrls: ['./detail-risk.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailSecurityRiskComponent implements OnInit {

  isLoading: boolean = false;
  riskId: number;
  themeSubscription: any;

  currentRisk : any;
  currentSource: any;

  constructor(
    protected location: Location,
    protected theme: NbThemeService,
    protected router: Router,
    private toastr: NbToastrService,
    private riskGateway: RisksGateway,
    private sourceGateway: SourcesGateway,
    protected activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.riskId = parseInt(paramMap.get('riskId'));
      this.getSecurityRisk();

    });
  }
  getSource(sourceId){
    this.sourceGateway.getSource(sourceId).subscribe(data=>{
      this.currentSource = data;
    });
  }
  getSecurityRisk(){
    this.riskGateway.getSecurityRisk(this.riskId).subscribe(data=>{
      this.currentRisk = data;
      this.getSource(this.currentRisk.sourceId);
    });
  }
  onBackClick(event){
    this.location.back();
  }
  onDeleteClick(event){
    if (window.confirm('Are you sure you want to delete?')) {
      this.riskGateway.deleteSecurityRisk(this.riskId).subscribe(res=>{
        this.toastr.success("risk was deleted");
        let queryParams: Params = { sourceId : null };
        this.router.navigate(['/pages/risks'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }, (error) => {
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });

    } else {
      event.confirm.reject();
    }
  }
  onEditClick(item){
    const queryParams: Params = { };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/risks/security/edit'], extras);
  }
}
