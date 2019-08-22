import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormatService } from '../../../@core/utils/format.service';

@Component({
  selector: 'app-items-source',
  templateUrl: './items-source.component.html',
  styleUrls: ['./items-source.component.scss']
})
export class ItemsSourceComponent implements OnInit {

  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentSource: any;  
  productId = 0;
  customerId = 0;
  sourceId: number;

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
        type: 'number',
        filter: true,
        width: '4rem',
        editable: false
      },
      start: {
        title: 'Start',
        type: 'date',
        width: '9rem',
        filter: true
      },      
      end: {
        title: 'End',
        type: 'date',
        width: '9rem',
        filter: true
      },            
      good: {
        title: 'Good',
        width: '6rem',
        type: 'number',
        filter: true
      },      
      total: {
        title: 'Total',
        width: '6rem',
        type: 'number',
        filter: true
      },
      diff: {
        title: 'Delta',
        width: '6rem',
        type: 'number',
        filter: true
      },      
      availability: {
        title: 'Availability',
        width: '3rem',
        type: 'number',
        filter: true
      },      
      createdOn: {
        title: 'Created',        
        type: 'date',
        width: '9rem',
        filter: true
      },      
      createdBy: {
        title: 'CreatedBy',        
        type: 'string',
        filter: true
      },      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private router: Router, 
    private formatService: FormatService,
    private activatedRoute: ActivatedRoute) { 
      
    }        
  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.sourceId = parseInt(paramMap.get('sourceId'));      
      this.getSourceItems();
    });          
  }

  getSourceItems(){
    this.sourcesGateway.getSource(this.sourceId).subscribe(source=>{
      this.currentSource = source;
      this.sourcesGateway.getSourceItems(this.sourceId).subscribe(data=>{

        const transform  = data.map(c =>{ 
          c.start =  this.formatService.getGridDateFromDate(new Date(c.start));
          c.end = this.formatService.getGridDateFromDate(new Date(c.end));
          c.createdOn = this.formatService.getGridDateFromDate(new Date(c.createdOn));
          c.diff = c.total - c.good;
          return c;
        });

        this.source.load(data);
      });
    });        
  }  
  onBackClick(event){
    this.location.back();
  }
}
