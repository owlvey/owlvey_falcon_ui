import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { RisksGateway } from '../../../@core/data/risks.gateway';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-security-reliability',
  templateUrl: './create-reliability.component.html',
  styleUrls: ['./create-reliability.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateReliabilityThreatComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;
  createForm: FormGroup;

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
      this.createForm = this.fb.group({
        name: ['', Validators.required]
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
      let  defer = this.riskGateway.postReliabilityThreat(this.createForm.value.name);
      defer.subscribe((data) => {
          this.toastr.success("Success");
          this.isLoading = false;
          this.location.back();
        }, (error) => {
          this.isLoading = false;
          this.toastr.warning("Something went wrong, please try again.", "Warning")
        });
    }
}
