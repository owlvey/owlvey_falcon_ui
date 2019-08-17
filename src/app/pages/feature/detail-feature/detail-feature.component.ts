import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService } from '@nebular/theme';
import { FeaturesGateway } from '../../../@core/data/features.gateway';


@Component({
  selector: 'app-detail-feature',
  templateUrl: './detail-feature.component.html',
  styleUrls: ['./detail-feature.component.scss']
})
export class DetailFeatureComponent implements OnInit, AfterViewInit, OnDestroy {
  
  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentSource : any= {};    
  productId = 0;
  featureId = 0;
  themeSubscription: any;
  series: Array<any> = [];
  
  startDate: Date = new Date();
  endDate: Date;  

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
        width: '3em',
        editable: false
      },
      feature: {
        title: 'Feature',
        type: 'string',
        filter: true
      },      
      source: {
        title: 'Source',
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
    private featuresGateway: FeaturesGateway,   
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
      this.featureId = parseInt(paramMap.get('featureId'));       
      this.startDate = new Date(paramMap.get("start"));           
      this.endDate = new Date(paramMap.get("end"));                 
      this.getSource();      
      this.getDaily();
    });          
  }  

  getSource(){
    this.featuresGateway.getFeature(this.featureId).subscribe(feature=>{
      this.currentSource = feature;
      const indicators = feature.indicators.map(c=>{        
        return c;
      });
      this.source.load(indicators);
    });        
  }

  getDaily(){
    this.featuresGateway.getDaily(this.featureId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
    });
  }

  onReportClick(event){        
    this.getDaily();
  }

  onIndicatorsRowSelect(event){
    const sourceId = event.data.sourceId;
    let queryParams: Params = { sourceId: sourceId };
    this.router.navigate(['/pages/sources/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  onBackClick(event){    
    //let queryParams: Params = { featureId: null };
    //this.router.navigate(['/pages/features'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });                 
    this.location.back();
  }
  ngOnDestroy(): void {
    
  }     
  
  ngAfterViewInit() {    
    
  }
}