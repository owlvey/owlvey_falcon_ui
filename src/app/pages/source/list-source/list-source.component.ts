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
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: TooltipComponent
      },
      securityRiskLabel: {
        title: 'Estimated Security Risk',
        type: 'string',
        filter: true,
        width: '3em',
        sort:true,
      },
      reliabilityRiskLabel: {
        title: 'Estimated Reliability Risk',
        type: 'string',
        filter: true,
        width: '3em',
        sort:true,
      },
      availability: {
        title: 'Availability',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      availabilityDebt: {
        title: 'Debt',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
      },
      latency: {
        title: 'Latency',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      latencyDebt: {
        title: 'Debt',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
      },
      experience: {
        title: 'Experience',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      experienceDebt: {
        title: 'Debt',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
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
      name: {
        title: 'Name',
        type: 'custom',
        renderComponent: TooltipComponent
      },
      total: {
        title: 'Total',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      good: {
        title: 'Good',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      availability: {
        title: 'Availability',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      latency: {
        title: 'Latency',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      experience: {
        title: 'Experience',
        type: 'number',
        filter: true,
        width: '2em',
        sort:true,
        sortDirection: 'asc'
      },
      correlation: {
        title: 'Correlation',
        type: 'number',
        filter: true,
        width: '3em'
      },
      references: {
        title: 'Refs',
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

        const sources = data.items.map(c=>{
            c.availability = c.measure.availability;
            c.latency = c.measure.latency;
            c.experience = c.measure.experience;
            c.total = c.measure.total;
            c.good = c.measure.good;
            c.availabilityDebt = c.debt.availability;
            c.latencyDebt = c.debt.latency;
            c.experienceDebt = c.debt.experience;
            return c;
          }
        );
        const avaialabilitySources = sources.filter(c => c.measure.total > 0);
        const referencesSources = sources.filter(c => c.references > 0);

        this.totalSources = sources.length;
        this.totalAssigned = referencesSources.length;
        this.availabilitySource.load(avaialabilitySources);
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
    let queryParams: Params = { sourceId: sourceId };
    this.router.navigate(['/pages/sources/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }
}
