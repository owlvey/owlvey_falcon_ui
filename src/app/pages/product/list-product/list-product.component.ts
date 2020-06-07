import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormatService } from '../../../@core/utils/format.service';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  currentCustomer: any;
  customerId = 0;

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
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
        width: '12em'        
      },      
      beforeAvailability: {
        title: 'Before',
        type: 'number',
        filter: false,        
        width: '3em'        
      },
      preAvailability: {
        title: 'Previous',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '3em'        
      },
      availability: {
        title: 'Availability Debt (Per)',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '3em'        
      },      
      beforeLatency: {
        title: 'Before',
        type: 'number',
        filter: false,        
        width: '3em'        
      },
      preLatency: {
        title: 'Previous',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '3em'        
      },
      latency: {
        title: 'Latency Debt (Sec)',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '3em'        
      },      
      beforeExperience: {
        title: 'Before',
        type: 'number',
        filter: false,        
        width: '3em'        
      },
      preExperience: {
        title: 'Previous',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '3em'        
      },
      experience: {
        title: 'Experience Debt (Sec)',
        type: 'html',        
        filter: false,
        compareFunction:this.format.compareIconNumberColumn,
        width: '3em'        
      },      
      featureCoverage: {
        title: 'Feature Coverrage',
        type: 'number',
        filter: false,
        width: '3em',
      },            
      featureOwnership: {
        title: 'Feature Ownership',
        type: 'number',
        filter: false,
        width: '3em',
      },      
      sourceCoverage: {
        title: 'Source Coverage(%)',
        type: 'number',
        filter: false,
        width: '3em',
      },
    },
  };
  public startDate : Date;
  public endDate: Date;
  public productId: number;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    protected format: FormatService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = parseInt(paramMap.get('customerId'));
      this.productId = parseInt(paramMap.get('productId'));
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));
      this.getProduct();
    });
  }

  getProduct(){
    this.customerGateway.getCustomer(this.customerId).subscribe(data=>{
      this.currentCustomer = data;
    });
    this.productGateway.getProducts(this.customerId, this.startDate, this.endDate).subscribe(data=>{

      const target = data.items.map(c=>{
        c.beforeAvailability = c.beforeDebt.availability;
        c.preAvailability = this.format.buildDebtColumnValue(c.previousDebt.availability, c.beforeDebt.availability);
        c.availability =this.format.buildDebtColumnValue(c.debt.availability, c.previousDebt.availability); 

        c.beforeLatency = this.format.round2Decimals(c.beforeDebt.latency / 1000);
        c.preLatency = this.format.buildDebtColumnValue(c.previousDebt.latency / 1000, c.beforeDebt.latency / 1000);
        c.latency =this.format.buildDebtColumnValue(c.debt.latency / 1000, c.previousDebt.latency / 1000); 

        c.beforeExperience = c.beforeDebt.experience;
        c.preExperience = this.format.buildDebtColumnValue(c.previousDebt.experience, c.beforeDebt.experience);
        c.experience =this.format.buildDebtColumnValue(c.debt.experience, c.previousDebt.experience); 

        c.featureCoverage = this.format.getProportion(c.coverage, c.featuresCount);
        c.featureOwnership = this.format.getProportion(c.ownership, c.featuresCount);
        c.sourceCoverage = this.format.getProportion(c.utilization, c.sourcesCount);

        return c;
      });

      this.source.load(target);
    });
  }

  onProductRowSelect(event){
    const productId = event.data.id;
    let queryParams: Params = { productId: productId};
    this.router.navigate(['/pages/products/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  onCreate(event) {
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/products/create'], extras);
  }

}
