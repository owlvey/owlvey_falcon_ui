import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormatService } from '../../../@core/utils/format.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-percent-source',
  templateUrl: './percent-source.component.html',
  styleUrls: ['./percent-source.component.scss']
})
export class PercentSourceComponent implements OnInit {

  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentSource: any;  
  productId = 0;
  customerId = 0;
  sourceId: number;

  editForm: FormGroup;

  settings = {    
    mode: 'external',
    actions:{
      columnTitle:'Delete',      
      position: 'right',
      add:false,
      edit:false,
      delete:true
    },
    pager: {
      perPage: 20
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,                  
    },
    columns: {      
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
        title: 'Quality',
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
  startDate: Date;
  endDate: Date;
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private router: Router, 
    private toastr: NbToastrService,
    private fb: FormBuilder,
    private formatService: FormatService,
    private activatedRoute: ActivatedRoute) { 
      
    }        
  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.customerId = parseInt(paramMap.get('customerId'));      
      this.sourceId = parseInt(paramMap.get('sourceId'));     
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));                
      this.getSourceItems();
    });          

    var d = new Date();
    d.setDate(d.getDate()-30);

    this.editForm = this.fb.group({      
      sourceId: [this.sourceId , Validators.required],
      percent: [0.8, Validators.required],      
      start: [(d).toJSON().slice(0,10), Validators.required],
      end: [(new Date()).toJSON().slice(0,10), Validators.required]      
    });
  }

  getSourceItems(){
    this.sourcesGateway.getSource(this.sourceId).subscribe(source=>{
      this.currentSource = source;
      this.sourcesGateway.getSourceItemsByPeriod(this.sourceId, this.startDate, this.endDate).subscribe(data=>{
        const transform  = data.map(c =>{ 
          c.start =  this.formatService.getGridDateFromDate(new Date(c.start));
          c.end = this.formatService.getGridDateFromDate(new Date(c.end));
          c.createdOn = this.formatService.getGridDateFromDate(new Date(c.createdOn));
          c.diff = c.total - c.good;
          return c;
        });

        this.source.load(transform);
      });
    });        
  }  
  onDelete(event){
    const sourceItemId = event.data.id;    
    this.sourcesGateway.deleteSourceItem(sourceItemId).subscribe(data=>{
      this.toastr.success("Source Item Deleted Success");
      this.getSourceItems();
    });        
  }
  onBackClick(event){
    this.location.back();
  }

  onSubmit() {    
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }    
    this.isLoading = true;    
    const model = this.editForm.value;    
    let  defer = this.sourcesGateway.postSourceItemPercent(model);
    defer.subscribe((data) => {
        this.toastr.success("Source Modified Success");
        this.isLoading = false;                
        this.getSourceItems();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }

}
