import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { RisksGateway } from '../../../@core/data/risks.gateway';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-detail-security-threat',
  templateUrl: './detail-threat.component.html',
  styleUrls: ['./detail-threat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailSecurityThreatComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;

  threatId: number;
  currentSource: any;
  constructor(
    protected location: Location,
    protected riskGateway: RisksGateway,
    protected toastr: NbToastrService,
    protected theme: NbThemeService,
    protected router: Router,
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute) {
      this.isLoading = false;
    }
    ngOnInit(): void {
      this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
        this.threatId = parseInt(paramMap.get('threatId'));
        this.loadSource();
      });


    }
    loadSource(){
      this.riskGateway.getSecurityThreat(this.threatId).subscribe(data=>{
          this.currentSource = data;
      });
    }
    onEditClick(event){
      const queryParams: Params = { };
      const extras: any = {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
      this.router.navigate(['/pages/threats/security/edit'], extras);
    }
    onDeleteClick(event){
      if (window.confirm('Are you sure you want to delete?')) {
        this.riskGateway.deleteSecurityThreat(this.threatId).subscribe(data=>{
          this.toastr.success("Portfolio was deleted");
          let queryParams: Params = { portfolioId : null };
          this.router.navigate(['/pages/threats'], {
            queryParams: queryParams,
            queryParamsHandling: 'merge' });

        }, (error) => {
          this.toastr.warning("Something went wrong, please try again.", "Warning")
        });
      }
      else {

      }
    }
    onBackClick(event){
      this.location.back();
    }
}
