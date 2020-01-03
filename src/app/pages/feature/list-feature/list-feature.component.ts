import { Component, OnInit, ViewChildren } from "@angular/core";
import {  Location } from "@angular/common";
import { ActivatedRoute, Router, ParamMap, Params } from "@angular/router";
import { CustomersGateway } from "./../../../@core/data/customers.gateway";
import { LocalDataSource } from "ng2-smart-table";
import { ProductsGateway } from "../../../@core/data/products.gateway";
import { FeaturesGateway } from "../../../@core/data/features.gateway";
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: "app-list-feature",
  templateUrl: "./list-feature.component.html",
  styleUrls: ["./list-feature.component.scss"]
})
export class ListFeatureComponent extends ProductBaseComponent {
  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
    
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 30
    },
    columns: {
      id: {
        title: "Id",
        type: "number",
        filter: true,
        width: "3em",
        editable: false
      },
      name: {
        title: "Name",
        type: "string",
        filter: true,
        editable: false
      },            
      availability: {
        title: "Quality",
        type: "number",
        filter: true,
        width: "3em",
        editable: false
      },           
      indicatorsCount: {
        title: "Sources",
        type: "number",
        filter: true,
        width: "3em",
        editable: false
      },
      serviceCount:{
        title: "Services",
        type: "number",
        filter: true,
        width: "3em",
        editable: false
      },
      squads:{
        title: "Squads",
        type: "number",
        filter: true,
        width: "3em",
        editable: false
      }      
    }
  };

  /*
  mttm: {
        title: 'MTTM',
        type: 'number',
        filter: true,       
        width: '12em', 
        editable: false
      },             
  */ 

  source: LocalDataSource = new LocalDataSource();

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected featureGateway: FeaturesGateway,
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }          
  onChangeQueryParameters(paramMap: ParamMap): void {               
    super.onChangeQueryParameters(paramMap);        
    this.getFeature();
  }

  getFeature() {    
    this.featureGateway
      .getFeaturesWithAvailabilities(this.productId, this.startDate, this.endDate)
      .subscribe(data => {
        this.source.load(data);        
    });
  }


  onUserRowSelect(event): void {
    const featureId = event.data.id;
    let queryParams: Params = { featureId: featureId };
    this.router.navigate(["/pages/features/detail"], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "merge"
    });
  }
  onCreate(event) {
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "merge"
    };
    this.router.navigate(["/pages/features/create"], extras);
  }
}
