import { Component, OnInit, ViewChildren, NgModule, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { TooltipComponent } from '../../common/components/tooltipComponent';

@Component({
  selector: 'app-list-source',
  templateUrl: './list-source.component.html',
  styleUrls: ['./list-source.component.scss']
})
export class ListSourceComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentProduct: any;  
  productId = 0;
  customerId = 0;

  settings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 50
    },
    columns: {      
      id:{
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em'   
      },
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: TooltipComponent
      },   
      group: {
        title: 'Group',
        type: 'string',
        filter: true,
        width: '6em',
      },     
      kind: {
        title: 'Type',
        type: 'string',
        filter: true,
        width: '6em',
      },                         
      measure: {
        title: 'Measure',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },             
      references: {
        title: 'Refs',
        type: 'number',
        filter: true,
        width: '3em'        
      },             
    },
  };
  latencySettings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 50
    },
    columns: {      
      id:{
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em'   
      },
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: TooltipComponent
      },                 
      kind: {
        title: 'Type',
        type: 'string',
        filter: true,
        width: '6em',
      },                         
      measure: {
        title: 'Latency',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },             
      references: {
        title: 'Refs',
        type: 'number',
        filter: true,
        width: '3em'        
      },             
    },
  };

  availabilitySettings =  {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 50
    },
    columns: {      
      id:{
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em'   
      },
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: TooltipComponent
      },           
      kind: {
        title: 'Type',
        type: 'string',
        filter: true,
        width: '6em',
      },                         
      measure: {
        title: 'Availability',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },             
      references: {
        title: 'Refs',
        type: 'number',
        filter: true,
        width: '3em'        
      },             
      correlation: {
        title: 'Correlation',
        type: 'number',
        filter: true,
        width: '3em'        
      },             
    },
  };

  experienceSettings =  {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 50
    },
    columns: {      
      id:{
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em'   
      },
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: TooltipComponent
      },           
      kind: {
        title: 'Type',
        type: 'string',
        filter: true,
        width: '6em',
      },                         
      measure: {
        title: 'Proportion',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },             
      references: {
        title: 'Refs',
        type: 'number',
        filter: true,
        width: '3em'        
      },       
      correlation: {
        title: 'Correlation',
        type: 'number',
        filter: true,
        width: '3em'        
      },                   
    },
  };

  startDate: Date;
  endDate: Date;  
  source: LocalDataSource = new LocalDataSource();
  availabilitySource: LocalDataSource = new LocalDataSource();
  latencySource: LocalDataSource = new LocalDataSource();
  experienceSource: LocalDataSource = new LocalDataSource();

  totalSources: number = 0;
  totalAssigned: number = 0;

  availabilityAvg: number = 0;
  availabilityInteractionAvg: number = 0;
  availabilityInteractionsTotal: number = 0;
  availabilityInteractionsGood: number = 0;

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
      this.productId = parseInt(paramMap.get('productId'));            
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getProduct(this.productId);
    });          
  }

  getProduct(productId: number){
    this.productGateway.getProduct(productId).subscribe(data=>{
      this.currentProduct = data;
      
      this.sourcesGateway.getSourcesWithAvailability(productId, this.startDate, this.endDate).subscribe(data=>{

        this.availabilityAvg = data.availability;
        this.availabilityInteractionAvg = data.availabilityInteractions;
        this.availabilityInteractionsTotal = data.availabilityInteractionsTotal;
        this.availabilityInteractionsGood = data.availabilityInteractionsGood;

        const sources = data.items;
        const avaialabilitySources = sources.filter(c=> c.group == "Availability");
        const latencySources = sources.filter(c=> c.group == "Latency");
        const experienceSources = sources.filter(c=> c.group == "Experience");
        const referencesSources = sources.filter(c=> c.references > 0);
        
        this.totalSources = sources.length;
        this.totalAssigned = referencesSources.length;
        
        
        this.latencySource.load(latencySources);
        this.availabilitySource.load(avaialabilitySources);
        this.experienceSource.load(experienceSources);
        this.source.load(sources);
      });
    });     
  }

  onCreate(event) {
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/sources/create'], extras);
  }

  onGraph(event){
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/sources/treemap'], extras);
  }

  onUserRowSelect(event): void {    
    const sourceId = event.data.id;
    const group = event.data.group;
    const kind = event.data.kind;
    if (group == 'Availability'){
      if ( kind == 'Interaction' ){
        let queryParams: Params = { sourceId: sourceId };
        this.router.navigate(['/pages/sources/availability/interaction/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
      }
      else{
        let queryParams: Params = { sourceId: sourceId };
        this.router.navigate(['/pages/sources/availability/proportion/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
      }      
    }
    if (group == 'Latency')
    {
      let queryParams: Params = { sourceId: sourceId };
      this.router.navigate(['/pages/sources/latency/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
    }
    if (group == 'Experience'){
      if ( kind == 'Interaction' ){
        let queryParams: Params = { sourceId: sourceId };
        this.router.navigate(['/pages/sources/experience/interaction/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
      }
      else{
        let queryParams: Params = { sourceId: sourceId };
        this.router.navigate(['/pages/sources/experience/proportion/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
      }      
    }
    
  }
}
