import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { UsersGateway } from '../../../@core/data/users.gateway';


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  currentUser:any;
  userId: number;

  constructor(
      private location: Location,      
      private userGateway: UsersGateway,      
      private router: Router,
      private activatedRoute: ActivatedRoute) {
      }
    ngOnInit() {
      this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {          
        this.userId = parseInt(paramMap.get('userId')); 
        this.userGateway.getUser(this.userId).subscribe(data=>{
          this.currentUser = data;
        });         
      });
    }
    onEditClick(event){        
      let queryParams: Params = { };
      this.router.navigate(['/pages/users/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }
    onBackClick(event){
      this.location.back();
    }
    onDeleteClick(event){
      
    }
}