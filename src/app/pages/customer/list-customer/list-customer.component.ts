import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService } from '@nebular/theme';
import { CustomerEventHub } from '../../../@core/hubs/customer.eventhub';
import { FormatService } from '../../../@core/utils/format.service';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  settings = {
    mode: 'external',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
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
      productsCount: {
        title: 'Products',
        type: 'number',
        filter: false,
        width: '3em',
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public startDate : Date;
  public endDate: Date;

  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    protected format: FormatService,
    private sourcesGateway: SourcesGateway,
    private activatedRoute: ActivatedRoute,
    private toastr: NbToastrService,
    private router: Router,    
    private customerEventHub: CustomerEventHub
  ) {
  }

  ngOnInit() {    
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {      
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));
      this.getCustomers();
    });
    
  }

  getCustomers() {
    this.customerGateway.getCustomersWithQuality(this.startDate, this.endDate).subscribe(data => {
      const target = data.map(c=>{
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

  deleteCustomer(item: any) {
    this.customerGateway.deleteCustomer(item.id)
      .subscribe((data) => {
        this.getCustomers();
      }, (error) => {
        this.toastr.danger('Something went wrong. Please try again.');
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteCustomer(event.data);
    } else {
      event.confirm.reject();
    }
  }

  onCreate(event) {
    const queryParams: Params = {};
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/pages/customers/create'], extras);
  }
  onEdit(event) {
    this.router.navigate(['/pages/customers/' + event.data.id]);
  }
  onCustomerRowSelect(event) {
    const customerId = event.data.id;
    const queryParams: Params = { customerId: customerId };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/pages/customers/detail'], extras);
  }
}
