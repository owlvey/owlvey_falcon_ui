import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalSidebarComponent } from './modal-sidebar/modal-sidebar.component';


@NgModule({
  declarations: [
    ModalComponent,
    ModalSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ModalComponent,
    ModalSidebarComponent
  ],
  entryComponents: [
    
  ]
})
export class ModalModule { }
