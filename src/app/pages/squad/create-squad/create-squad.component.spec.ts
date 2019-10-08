import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSquadComponent } from './create-squad.component';

import {      
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbToastrService
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { VisModule } from 'ngx-vis';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ControlsModule } from '../../../@controls/controls.module';
import { CommonModule } from '@angular/common';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { ActivatedRoute, Router } from '@angular/router';

describe('CreateSquadComponent', () => {
  let component: CreateSquadComponent;
  let fixture: ComponentFixture<CreateSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({      
      declarations: [ CreateSquadComponent ],
      providers:[
        {provide: SquadsGateway, useValue: SquadsGateway},
        {provide: ActivatedRoute, useValue: ActivatedRoute},
        {provide: NbToastrService, useValue: NbToastrService},
        {provide: Router, useValue: Router},        
      ],
      imports: [FormsModule, ReactiveFormsModule, CommonModule,  Ng2SmartTableModule, 
        NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
        NbCardModule, ControlsModule, NbCheckboxModule, VisModule, NbIconModule, NbActionsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSquadComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
