import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { RisksGateway } from '../../../@core/data/risks.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-security-threat',
  templateUrl: './edit-threat.component.html',
  styleUrls: ['./edit-threat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditSecurityThreatComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;
  createForm: FormGroup;
  threatId: number;
  currentSource: object;
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
      this.createForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });

    }
    loadSource(){
      this.riskGateway.getSecurityThreat(this.threatId).subscribe(data=>{
        this.createForm.get("name").setValue(data.name);
        this.createForm.get("description").setValue(data.description);
      });
    }
    goBack(){
      this.location.back();
    }
    onSubmit() {
      if (!this.createForm.valid) {
        this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
        return;
      }
      this.isLoading = true;
      let  defer = this.riskGateway.putSecurityThreat(this.threatId, this.createForm.value);
      defer.subscribe((data) => {
          this.toastr.success("Product Created Success");
          this.isLoading = false;
          this.location.back();
        }, (error) => {
          this.isLoading = false;
          this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
    }
}
