import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPortfolioComponent } from './list-portfolio/list-portfolio.component';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';
import { DetailPortfolioComponent } from './detail-portfolio/detail-portfolio.component';
import { PortfolioRoutingModule } from "./portfolio.routing.module";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ControlsModule  } from "./../../@controls/controls.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  NbTreeGridModule
} from '@nebular/theme';


@NgModule({
  declarations: [DetailPortfolioComponent, ListPortfolioComponent, EditPortfolioComponent, CreatePortfolioComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PortfolioRoutingModule, Ng2SmartTableModule, 
     NbCardModule, NgxEchartsModule, ChartModule, NbDatepickerModule, NgxChartsModule, NbButtonModule,
     NbCardModule, ControlsModule]
})
export class PortfolioModule { }


