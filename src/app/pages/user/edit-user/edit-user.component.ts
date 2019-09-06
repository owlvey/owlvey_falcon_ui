import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    constructor(
        private location: Location,
        private customerGateway: CustomersGateway,
        private productGateway: ProductsGateway,
        private sourcesGateway: SourcesGateway,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        }
      ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {          
          
        });
      }
}