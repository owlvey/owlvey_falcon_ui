import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbWindowRef, NbStepperComponent, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { RisksGateway } from 'app/@core/data/risks.gateway';
import { debug } from 'console';


@Component({
  selector: 'app-create-reliability-source',
  templateUrl: './create-reliability-source.component.html',
  styleUrls: ['./create-reliability-source.component.scss']
})
export class CreateReliabilitySourceComponent  {
  currentSource: any = null;
  currentThreat: any = null;
  createForm: FormGroup;

  @ViewChild('stepper', { static: true }) stepper: NbStepperComponent;

  dataSettings = {
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
      ettr:{
        title: 'ETTR',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      userImpact:{
        title: 'User Impact',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      ettFail:{
        title: 'Time To Fail',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      incidentsPerYear : {
        title: 'Incidents Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
      badMinutesPerYear  : {
        title: 'Bad Minutes Per Year',
        type: 'number',
        width: '2em',
        sort:true,
        filter: true,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  dataSource: LocalDataSource = new LocalDataSource();

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
    this.riskGateway.getReliabilityThreats().subscribe(data=>{
      this.dataSource.load(data);
    });
  }

  onThreatRowSelect(event){
    this.riskGateway.getReliabilityThreat(event.data.id).subscribe(data=>{
      this.currentThreat = data;
      this.createForm.get("name").setValue(data.name);
      this.createForm.get("tags").setValue(data.tags);
      this.createForm.get("description").setValue(data.description);
    });
    this.stepper.next();
  }
  onNewReliabilityRiskSave(){
    let model = JSON.parse(JSON.stringify(this.currentThreat));
    model.sourceId = this.currentSource.id;
    Object.assign(model, this.createForm.value);
    let defer = this.riskGateway.postReliabilityRisk(model);
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
