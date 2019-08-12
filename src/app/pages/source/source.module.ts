import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSourceComponent } from './create-source/create-source.component';
import { ListSourceComponent } from './list-source/list-Source.component';
import { SourceRoutingModule } from "./source.routing.module";
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [CreateSourceComponent, ListSourceComponent],
  imports: [CommonModule, SourceRoutingModule, Ng2SmartTableModule, NbCardModule]
})
export class SourceModule { }
