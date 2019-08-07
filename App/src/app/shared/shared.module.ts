import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTabsetModule, NgbDropdownModule, NgbTooltipModule, NgbAlertModule, NgbModalModule, NgbCollapseModule, NgbAccordionModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { InitialsPipe } from '../initials.pipe';
import { ConfirmDeleteDirective } from '../../directives/confirm-delete.directive';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { OrderByPipe } from './order-by.pipe';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InitialsPipe,
    ConfirmDeleteDirective,
    LoadingComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    NgbTabsetModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgbModalModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbPopoverModule,
    DragAndDropModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NgbTabsetModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgbModalModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbPopoverModule,
    InitialsPipe,
    ConfirmDeleteDirective,
    LoadingComponent,
    DragAndDropModule,
    OrderByPipe,
    MonacoEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
