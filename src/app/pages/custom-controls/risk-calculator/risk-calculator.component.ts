import { Component, OnInit, ViewChildren, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debug } from 'console';


@Component({
  selector: 'app-control-risk-calculator',
  templateUrl: './risk-calculator.component.html',
  styleUrls: ['./risk-calculator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RiskCalculatorControlComponent implements OnInit {

  isLoading: boolean = false;

  isReadOnly = false;

  skillLevel = null;

  @Input()
  controlReadOnly: boolean = true;

//#region likehood
  agentSkillLevel: any = "0";
  motive: any = "0";
  opportunity: any = "0";
  size: any = "0";

  easyDiscovery : any = "0";
  easyExploit : any = "0";
  awareness : any = "0";
  intrusionDetection : any = "0";
//#endregion

//#region  impact
  lossConfidentiality: any = "0";
  lossIntegrity : any = "0";
  lossAvailability: any = "0";
  lossAccountability: any = "0";

  financialDamage: any = "0";
  reputationDamage: any = "0";
  nonCompliance: any = "0";
  privacyViolation: any = "0";
//#endregion

  get ThreatAgentFactors(){
    return (Number.parseInt(this.agentSkillLevel) +
            Number.parseInt(this.motive) +
            Number.parseInt(this.opportunity) +
            Number.parseInt(this.size))/4 ;
  }

  get VulnerabilityFactors(){
      return (Number.parseInt(this.easyDiscovery) +
           Number.parseInt(this.easyExploit) +
           Number.parseInt(this.awareness) +
           Number.parseInt(this.intrusionDetection)) / 4;
  }
  get BusinessImpactFactors(){
    return (Number.parseInt(this.financialDamage) +
            Number.parseInt(this.reputationDamage) +
            Number.parseInt(this.nonCompliance) +
            Number.parseInt(this.privacyViolation))/4;
  }

  get TechnicalImpactFactors(){
    return  (Number.parseInt(this.lossConfidentiality) +
            Number.parseInt(this.lossIntegrity) +
            Number.parseInt(this.lossAvailability) +
            Number.parseInt(this.lossAccountability)) / 4;
  }

  get likeHood(){
    return (this.ThreatAgentFactors + this.VulnerabilityFactors)/2;
  }
  get impact(){
    return (this.TechnicalImpactFactors + this.BusinessImpactFactors)/2;
  }
  get risk(){
    return this.likeHood * this.impact;
  }
  get riskLabel(){
    let label = "";
    if (0 <= this.risk && this.risk <= 3){
      label = "Low";
    }
    else if (3 < this.risk && this.risk <= 6){
      label = "Medium";
    }
    else if (6 < this.risk && this.risk <= 9){
      label = "High";
    }
    return label;
  }

  @Input()
  set dataItems(data: any){
    if (data){
      this.agentSkillLevel =  data.agentSkillLevel.toString();
      this.motive = data.motive.toString();
      this.opportunity = data.opportunity.toString();
      this.size = data.size.toString();

      this.easyDiscovery = data.easyDiscovery.toString();
      this.easyExploit = data.easyExploit.toString();
      this.awareness = data.awareness.toString();
      this.intrusionDetection = data.intrusionDetection.toString();

      this.financialDamage = data.financialDamage.toString();
      this.reputationDamage = data.reputationDamage.toString();
      this.nonCompliance = data.nonCompliance.toString();
      this.privacyViolation = data.privacyViolation.toString();

      this.lossConfidentiality = data.lossConfidentiality.toString();
      this.lossIntegrity = data.lossIntegrity.toString();
      this.lossAvailability = data.lossAvailability.toString();
      this.lossAccountability = data.lossAccountability.toString();

      this.isReadOnly = this.controlReadOnly;
      this._internalDataItems = data;
    }
  }
  _internalDataItems: any = null;
  @Output() dataItemsChange: EventEmitter<any> = new EventEmitter<any>();

  selectedChange(event){
    if (this._internalDataItems)
    {
      this._internalDataItems.agentSkillLevel = Number.parseInt(this.agentSkillLevel);
      this._internalDataItems.motive = Number.parseInt(this.motive);
      this._internalDataItems.opportunity = Number.parseInt(this.opportunity);
      this._internalDataItems.size = Number.parseInt(this.size),

      this._internalDataItems.easyDiscovery = Number.parseInt(this.easyDiscovery);
      this._internalDataItems.easyExploit = Number.parseInt(this.easyExploit);
      this._internalDataItems.awareness = Number.parseInt(this.awareness);
      this._internalDataItems.intrusionDetection = Number.parseInt(this.intrusionDetection);

      this._internalDataItems.financialDamage = Number.parseInt(this.financialDamage);
      this._internalDataItems.reputationDamage = Number.parseInt(this.reputationDamage);
      this._internalDataItems.nonCompliance = Number.parseInt(this.nonCompliance);
      this._internalDataItems.privacyViolation = Number.parseInt(this.privacyViolation);

      this._internalDataItems.lossConfidentiality = Number.parseInt(this.lossConfidentiality);
      this._internalDataItems.lossIntegrity = Number.parseInt(this.lossIntegrity);
      this._internalDataItems.lossAvailability = Number.parseInt(this.lossAvailability);
      this._internalDataItems.lossAccountability = Number.parseInt(this.lossAccountability);
      this.dataItemsChange.emit(this._internalDataItems);
    }
  }
  constructor(
    protected location: Location,
    protected toastr: NbToastrService,
    protected theme: NbThemeService,
    protected router: Router,
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute) {
      this.isLoading = false;
    }
    ngOnInit(): void {

    }

}
