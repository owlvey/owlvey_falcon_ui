import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListExportComponent } from './list-export/list-export.component';



const routes: Routes = [
  { path: '', component: ListExportComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportRoutingModule { }
 
export const routedComponents = [
  ListExportComponent,  
];
