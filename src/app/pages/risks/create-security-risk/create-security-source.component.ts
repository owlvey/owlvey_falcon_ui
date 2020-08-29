import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbWindowRef, NbStepperComponent, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { RisksGateway } from 'app/@core/data/risks.gateway';
import { debug } from 'console';


@Component({
  selector: 'app-create-security-source',
  templateUrl: './create-security-source.component.html',
  styleUrls: ['./create-security-source.component.scss']
})
export class CreateSecuritySourceComponent  {
  currentSource: any = null;
  currentThreat: any = null;
  createForm: FormGroup;

  @ViewChild('stepper', { static: true }) stepper: NbStepperComponent;

  securitySettings = {
    mode: 'external',
    pager: {
      perPage: 5
    },
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
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  securitySource: LocalDataSource = new LocalDataSource();

  constructor(public windowRef: NbWindowRef,
    private toastr: NbToastrService,
    private fb: FormBuilder,
    private riskGateway: RisksGateway) {
    let state: any = windowRef.config.context;
    this.currentSource = state.currentSource;
    this.createForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      tags: ['', Validators.required],
      description: ['', Validators.required]
    });
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
      this.createForm.get("name").setValue(data.name);
      this.createForm.get("tags").setValue(data.tags);
      this.createForm.get("description").setValue(data.description);
    });
    this.stepper.next();
  }
  onNewSecurityRiskSave(){
    let model = JSON.parse(JSON.stringify(this.currentThreat));
    model.sourceId = this.currentSource.id;
    Object.assign(model, this.createForm.value);
    let defer = this.riskGateway.postSecurityRisk(model);
    defer.subscribe((data) => {
      this.toastr.success("Source Created Success");
      this.close();
    }, (error) => {
      this.toastr.warning("Something went wrong, please try again.", "Warning")
    });

  }

  close() {
    this.windowRef.close();
  }

}
