import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
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
export class DetailSourceComponent implements OnInit, AfterViewInit {
  

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  currentSource : any= {};    
  productId = 0;
  sourceId = 0;
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];
  startDate: Date = new Date();
  endDate: Date;  
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private theme: NbThemeService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) {       
      this.endDate = new Date();
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 365);
    }        

  ngOnInit() {         
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.sourceId = parseInt(paramMap.get('sourceId'));   
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getSource();
      this.getDaily();
    });          
  }  

  getSource(){    
    this.sourcesGateway.getSourceWithAvailability(this.sourceId, this.endDate).subscribe(data=>{
      this.currentSource = data;            
    });    
  }
  getDaily(){
    this.sourcesGateway.getDaily(this.sourceId, this.startDate, this.endDate).subscribe(data=>{      
      this.series = data.items;      
    });
  }

  handleClick(event){        
    this.getDaily();
  }  
  onItemsClick($event){    
    let queryParams: Params = { };
    this.router.navigate(['/pages/sources/items'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }  
  onBackClick($event){    
    this.location.back();
  }
  onEditClick(event){
    let queryParams: Params = { };
    this.router.navigate(['/pages/sources/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  ngAfterViewInit() {    
    
  }
}