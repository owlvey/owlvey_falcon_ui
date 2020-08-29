import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbWindowRef, NbStepperComponent, NbToastrService, NbThemeService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { RisksGateway } from 'app/@core/data/risks.gateway';
import { debug } from 'console';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { SourcesGateway } from 'app/@core/data/sources.gateway';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


@Component({
  selector: 'app-detail-reliability-source',
  templateUrl: './detail-reliability-source.component.html',
  styleUrls: ['./detail-reliability-source.component.scss']
})
export class DetailReliabilityRiskComponent  {
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
      this.getRisk();
    });
  }
  getSource(sourceId){
    this.sourceGateway.getSource(sourceId).subscribe(data=>{
      this.currentSource = data;
    });
  }
  getRisk(){
    this.riskGateway.getReliabilityRisk(this.riskId).subscribe(data=>{
      this.currentRisk = data;
      this.getSource(this.currentRisk.sourceId);
    });
  }
  onBackClick(event){
    this.location.back();
  }
  onDeleteClick(event){
    if (window.confirm('Are you sure you want to delete?')) {
      this.riskGateway.deleteReliabilityRisk(this.riskId).subscribe(res=>{
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
    this.router.navigate(['/pages/risks/reliability/edit'], extras);
  }
}
