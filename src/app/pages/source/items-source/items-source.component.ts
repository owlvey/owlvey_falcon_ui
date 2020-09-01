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
  selector: 'items-source',
  templateUrl: './items-source.component.html',
  styleUrls: ['./items-source.component.scss']
})
export class ItemsSourceComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;
  currentSource: any = null;
  productId = 0;
  customerId = 0;
  sourceId: number;
  group: string;



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
      target: {
        title: 'Target',
        type: 'date',
        width: '12rem',
        filter: true,
        sort: true,
        sortDirection: 'asc'
      },
      total: {
        title: 'Total',
        width: '6rem',
        type: 'number',
        filter: true
      },
      good: {
        title: 'Good',
        width: '6rem',
        type: 'number',
        filter: true
      },
      delta: {
        title: 'Delta',
        width: '6rem',
        type: 'number',
        filter: true
      },
      measure: {
        title: 'Proportion',
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
      this.group =  paramMap.get('group');
      this.getSourceItems();
    });


  }

  getSourceItems(){
    this.sourcesGateway.getSource(this.sourceId).subscribe(data=>{
      this.currentSource = data;
    });

    let promise = null;
    if (this.group == "Availability"){
      promise = this.sourcesGateway.getAvailabilitySourceItemsByPeriod(this.sourceId, this.startDate, this.endDate);
    }
    if (this.group == "Latency"){
      promise = this.sourcesGateway.getLatencySourceItemsByPeriod(this.sourceId, this.startDate, this.endDate);
    }
    if (this.group == "Experience"){
      promise = this.sourcesGateway.getExperienceSourceItemsByPeriod(this.sourceId, this.startDate, this.endDate);
    }
    promise.subscribe(data=>{
      const transform  = data.map(c =>{
        c.target =  this.formatService.getGridDateTimeFromDate(new Date(c.target));
        c.createdOn = this.formatService.getGridDateFromDate(new Date(c.createdOn));
        return c;
      });
      this.source.load(transform);
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


  onUserRowSelect(event): void {
    const sourceItemId = event.data.id;
    this.sourcesGateway.getSourceItemById(sourceItemId).subscribe(data=>{

    });
  }
  onCreateProportions(event){

    if (this.group == "Latency" ){
      let queryParams: Params = { };
      this.router.navigate(['/pages/sources/items/create/latency'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }
    else{
      let queryParams: Params = { };
      this.router.navigate(['/pages/sources/items/create/proportion'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }


  }
  onCreateInteractions(event){
    if (this.group == "Latency" ){
      let queryParams: Params = { };
      this.router.navigate(['/pages/sources/items/create/latency'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }
    else{
      let queryParams: Params = {  };
      this.router.navigate(['/pages/sources/items/create/interaction'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
    }
  }

  onDeleteItemsClick(event){
    if (confirm('Are you sure to remove all items in this source?')){
      this.sourcesGateway.deleteAllSourceItem(this.sourceId).subscribe(data=>{
        alert('items deleted');
        this.getSourceItems();
      });
    }

  }
}
