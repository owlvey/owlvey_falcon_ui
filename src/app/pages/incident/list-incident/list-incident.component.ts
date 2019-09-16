import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';
import { IncidentsGateway } from '../../../@core/data/incident.gateway';

@Component({
  selector: 'app-list-incident',
  templateUrl: './list-incident.component.html',
  styleUrls: ['./list-incident.component.scss']
})
export class ListIncidentComponent extends ProductBaseComponent {

  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentProduct: any;  
  productId = 0;
  customerId = 0;
  startDate: Date = new Date();
  endDate: Date;  

  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 20
    },
    columns: {
      id: {
        title: 'Id',        
        filter: true,        
        editable: false,
        width: '2em'
      },      
      title: {
        title: 'Title',        
        filter: true,                
        editable: false,        
      },      
      start: {
        title: 'Start',              
        filter: true,        
        editable: false,
        width: '20em'
      },      
      ttm:{
        title: 'TTM',        
        filter: true,
        width: '2em',
        editable: false
      },                   
    },
  };

  source: LocalDataSource = new LocalDataSource();
  options: any = {};
  series: Array<any> = [];  

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,    
    protected incidentGateway: IncidentsGateway,
    protected theme: NbThemeService,
    private datePipe: DatePipe,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
    }     
  onChangeQueryParameters(paramMap: ParamMap): void {                 
      super.onChangeQueryParameters(paramMap);        
      this.loadIncidents();
  }
  onNgOnInit(): void {
      
  } 
  loadIncidents(){
    this.incidentGateway.getIncidents(this.productId, this.startDate, this.endDate).subscribe(data=>{

      data = data.map(c=> {
          c.start = this.datePipe.transform(new Date(c.start), 'yyyy-MM-dd hh:mm:ss').toString();
          return c;
        }
      );
      this.source.load(data);
    });    
  }
  onUserRowSelect(event){
    let queryParams: Params = { incidentId: event.data.id };
        this.router.navigate(['/pages/incidents/detail'], { 
          relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' }
    );     
  }
  onCreate(event){
    let queryParams: Params = {  };
    this.router.navigate(['/pages/incidents/create'], { 
      relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' }
    );     
  }
}
