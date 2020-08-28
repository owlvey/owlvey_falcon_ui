import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbWindowRef, NbStepperComponent } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { RisksGateway } from 'app/@core/data/risks.gateway';


@Component({
  selector: 'app-create-security-source',
  templateUrl: './create-security-source.component.html',
  styleUrls: ['./create-security-source.component.scss']
})
export class CreateSecuritySourceComponent  {
  currentSource: any = null;
  currentThreat: any = null;

  @ViewChild('stepper', { static: true }) stepper: NbStepperComponent;

  securitySettings = {
    mode: 'external',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      threatAgentFactor:{
        title: 'Threat Agent',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      vulnerabilityFactor:{
        title: 'Vulnerability',
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
      technicalImpact:{
        title: 'Technical impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: false,
      },
      businessImpact:{
        title: 'Business impact',
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
      risk:{
        title: 'Risk',
        type: 'number',
        width: '2em',
        sort:true,
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

  constructor(public windowRef: NbWindowRef, private riskGateway: RisksGateway) {
    let state: any = windowRef.config.context;
    this.currentSource = state.currentSource;
    this.loadSecurityThreats();
  }

  loadSecurityThreats(){
    this.riskGateway.getSecurityThreats().subscribe(data=>{
      this.securitySource.load(data);
    });
  }
  onSecurityThreatRowSelect(event){
    this.riskGateway.getSecurityThreat(event.data.id).subscribe(data=>{
      this.currentThreat = data;
    });
    this.stepper.next();

  }
  onPreviousSecurityThreat(event){}
  onNextSecurityThreat(event){}
  onNewSecurityRiskSave(event){}

  close() {
    this.windowRef.close();
  }

}
