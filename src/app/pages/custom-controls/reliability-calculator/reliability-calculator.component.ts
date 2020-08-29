import { Component, OnInit, ViewChildren, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debug } from 'console';
import { FormatService } from 'app/@core/utils/format.service';


@Component({
  selector: 'app-control-reliability-calculator',
  templateUrl: './reliability-calculator.component.html',
  styleUrls: ['./reliability-calculator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReliabilityCalculatorControlComponent implements OnInit {

  isLoading: boolean = false;

  isReadOnly = true;

  skillLevel = null;

  @Input()
  controlReadOnly: string = "true";

  ettr: number = 0;
  incidentsPerYear: number = 0;
  badMinutesPerYear: number = 0;

  @Input()
  set dataItems(data: any){
    if (data && Object.keys(data).length > 0){
      this.isReadOnly = JSON.parse(this.controlReadOnly);
      this._internalDataItems = data;
      this.valueChange();
    }
  }
  _internalDataItems: any = {};
  @Output() dataItemsChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    protected location: Location,
    protected toastr: NbToastrService,
    protected theme: NbThemeService,
    protected router: Router,
    protected fb: FormBuilder,
    protected format: FormatService,
    protected activatedRoute: ActivatedRoute) {
      this.isLoading = false;
    }
    ngOnInit(): void {

    }
    valueChange(){
      this.ettr = this._internalDataItems.ettd + this._internalDataItems.ette + this._internalDataItems.ettf;
      if (this._internalDataItems.ettFail){
        this.incidentsPerYear = this.format.round3Decimals(365.5 / this._internalDataItems.ettFail);
      }
      this.badMinutesPerYear = this.format.round3Decimals(this.ettr * this._internalDataItems.userImpact * this.incidentsPerYear);
    }
}
