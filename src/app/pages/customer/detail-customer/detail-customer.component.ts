import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';
import { FormatService } from '../../../@core/utils/format.service';


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  startDate: Date = new Date();
  endDate: Date;
  currentSource: any;
  customerId = 0;  
  source: LocalDataSource = new LocalDataSource();    
  
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


  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private toastr: NbToastrService,
    private router: Router,
    protected format: FormatService,
    private activatedRoute: ActivatedRoute) {
    }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = parseInt(paramMap.get('customerId'));
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));
      this.getCustomer();      
    });
  }
  getCustomer(){
    this.customerGateway.getCustomerWithAvailability(this.customerId, this.startDate, this.endDate).subscribe(data => {
      this.currentSource = data;
      
      const target = data.products.items.map(c=>{
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
  onBackClick(event){
    this.location.back();
  }

  onEditClick(event) {
    const queryParams: Params = {  };
    const extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/pages/customers/edit'], extras);
  }
  deleteCustomer() {
    this.customerGateway.deleteCustomer(this.customerId)
      .subscribe((data) => {
        this.location.back();
      }, (error) => {
        this.toastr.danger('Something went wrong. Please try again.', 'Error');
      });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteCustomer();
    } else {
      event.confirm.reject();
    }
  }
}
