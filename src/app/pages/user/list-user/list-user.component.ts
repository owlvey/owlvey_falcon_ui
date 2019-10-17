import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { UsersGateway } from '../../../@core/data/users.gateway';
import { NbThemeService } from '@nebular/theme';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit  {
   
    source: LocalDataSource = new LocalDataSource();
    settings = {
        actions:{
          add:false,
          edit:false,
          delete:false
        },
        columns: {
          id: {
            title: 'Id',
            type: 'number',
            filter: false,
            width: '3em',
          },
          email: {
            title: 'Email',
            type: 'string',
            filter: false
          },          
          name: {
            title: 'Name',
            type: 'string',
            filter: false
          },          
        },
      };
      
    constructor(
        protected location: Location,
        protected customerGateway: CustomersGateway,        
        protected theme: NbThemeService,
        protected router: Router, 
        protected userGateway: UsersGateway,
        protected activatedRoute: ActivatedRoute) {       
          
        }   
    ngOnInit(): void {
        this.userGateway.getUsers().subscribe(data=>{
            this.source.load(data);
        });
    }

    onCreate(event){
        let queryParams: Params = {};
        let extras: any = {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        }
        this.router.navigate(['/pages/users/create'], extras);
    }
    onRowSelected(event){
        const userId = event.data.id;
        let queryParams: Params = { userId: userId, uheader: null };
        this.router.navigate(['/pages/users/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }
}