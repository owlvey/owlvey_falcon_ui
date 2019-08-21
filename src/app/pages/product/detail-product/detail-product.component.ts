import { Component, OnInit, ViewChildren, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { NbThemeService } from '@nebular/theme';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { VisEdges, VisNetworkData, VisNetworkOptions,  VisNetworkService,  VisNode,  VisNodes, VisNodeOptions } from 'ngx-vis'
import { NbPasswordAuthStrategyOptions } from '@nebular/auth';

class ExampleNetworkData implements VisNetworkData {
  public nodes: VisNodes;
  public edges: VisEdges;
}

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent  extends CustomerBaseComponent  implements OnInit, AfterViewInit, OnDestroy  {
  public currentProduct : any = {};
  public productId : number;     
  sources: any[];  
  currentSource : any= {};            
  
  source: LocalDataSource = new LocalDataSource();
  graphData = {};
  

  public visNetwork: string = 'networkId1';
  public visNetworkData: ExampleNetworkData;
  public visNetworkOptions: VisNetworkOptions;


  
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected sourcesGateway: SourcesGateway,    
    protected featuresGateway: FeaturesGateway,    
    protected portfolioGateway: PortfoliosGateway,    
    protected theme: NbThemeService,
    protected router: Router, 
    protected visNetworkService: VisNetworkService,
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, theme, router, activatedRoute);
    }        
   
  onChangeQueryParameters(paramMap: ParamMap): void {    
    this.productId = parseInt(paramMap.get('productId'));                                
    super.onChangeQueryParameters(paramMap); 
    this.loadProduct();    
  }

  public loadProduct(){    
      this.productGateway.getProduct(this.productId).subscribe(data=>{
          this.currentProduct = data;          
      });       
  }

  onNgOnInit(): void {
    const nodes = new VisNodes([
      { id: '1', label: 'Node 1', group: '0', shape: 'hexagon'},
      { id: '2', label: 'Node 2', group: '0', shape: 'triangle' },
      { id: '3', label: 'Node 3', group: '1', shape: 'diamond' },
      { id: '4', label: 'Node 4', group: '1'},
      { id: '5', label: 'Node 5', group: '2', title: 'Title of Node 5' }]);

    const edges = new VisEdges([
        { from: '1', to: '3', color: {color:'red'} },
        { from: '1', to: '2', color:{inherit:'from'} },
        { from: '2', to: '4' },
        { from: '2', to: '5' }]);

    this.visNetworkData = {
        nodes,
        edges,
    };
    
    this.visNetworkOptions = {      
        layout: {
            hierarchical: {
                direction: "LR"
            }
        },        
        nodes: {                                     
          shape: 'dot',          
          size: 30,
          font: {
              size: 32,
              color: '#ffffff'
          },
          borderWidth: 2,
          shadow:true,          
        },
        edges: {
            width: 2,
            shadow:true
        }
    };    
  }

  
  onServiceRowSelect(event){
      const portfolioId = event.data.id;
      let queryParams: Params = { portfolioId: portfolioId };      
      this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  } 

  onReportClick(event){
    
  }
  
  ngAfterViewInit() {    
    
  }

  public networkInitialized(): void {
    // now we can use the service to register on events
    this.visNetworkService.on(this.visNetwork, 'click');

    // open your console/dev tools to see the click params
    this.visNetworkService.click
        .subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetwork) {
              console.log(eventData[1]);
            }
        });
  }
  public ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');
  }
}