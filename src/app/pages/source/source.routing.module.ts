<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailSourceComponent } from './detail-source/detail-source.component';
import { ListSourceComponent } from './list-source/list-source.component';



const routes: Routes = [
  { path: '', component: ListSourceComponent },
  { path: ':sourceId', component: DetailSourceComponent}  
];
=======
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListSourceComponent } from "./list-source/list-source.component";

const routes: Routes = [{ path: "", component: ListSourceComponent }];
>>>>>>> 06135fc8b2059ae4ddb56b851e645ae5cccf2d3e

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceRoutingModule {}
