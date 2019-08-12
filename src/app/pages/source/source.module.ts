import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSourceComponent } from './create-source/create-source.component';
import { ListSourceComponent } from './list-source/list-Source.component';
import { SourceRoutingModule } from "./source.routing.module";


@NgModule({
  declarations: [CreateSourceComponent, ListSourceComponent],
  imports: [CommonModule, SourceRoutingModule]
})
export class SourceModule { }
