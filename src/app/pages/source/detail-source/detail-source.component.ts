import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'app-detail-source',
  templateUrl: './detail-source.component.html',
  styleUrls: ['./detail-source.component.scss']
})
export class DetailSourceComponent implements OnInit, AfterViewInit, OnDestroy {
  

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentSource : any= {};  
  customerId = 0;
  productId = 0;
  sourceId = 0;
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];
  startDate: Date = new Date();
  endDate: Date;
  period: number = 1;
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private theme: NbThemeService,
    private activatedRoute: ActivatedRoute) {       
      this.endDate = new Date();
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 365);
    }        

  ngOnInit() {         
    this.customerId = this.activatedRoute.snapshot.params.customerId;
    this.productId = this.activatedRoute.snapshot.params.productId;
    this.sourceId = this.activatedRoute.snapshot.params.sourceId;    
    this.getSource();
  }  

  getSource(){
    this.sourcesGateway.getSource(this.sourceId).subscribe(data=>{
      this.currentSource = data;            
    });    
  }

  handleClick(event){        
    this.sourcesGateway.getDaily(this.sourceId, this.startDate, this.endDate, this.period).subscribe(data=>{      
      this.series = data.items;      
    });
  }

  ngOnDestroy(): void {
    
  }     
  
  ngAfterViewInit() {    
    
  }
}