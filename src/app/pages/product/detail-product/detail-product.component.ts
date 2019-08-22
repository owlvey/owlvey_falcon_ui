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
import { strictEqual } from 'assert';

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
  themeSubscription: any;

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
  colors: any;
  onNgOnInit(): void {    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {      
      this.colors = config.variables;      
      debugger;
      const echarts: any = config.variables.echarts;
      this.buildGraph();
    });
  }

/*
layoutBg: "#151a30"
  primary: "#a16eff"
  primaryLight: "#b18aff"
*/

  buildGraph(){    
    const fgText = this.colors.fgText;
    const primary = this.colors.primary;    
    const primaryLight = this.colors.primaryLight;
    const info = this.colors.info;    
    const infoLight = this.colors.infoLight;
    const danger = this.colors.danger;
    const dangerLight = this.colors.dangerLight;
    const warning = this.colors.warning;
    const warningLight = this.colors.warningLight;
    const success = this.colors.success;
    const successLight = this.colors.successLight;
    this.productGateway.getGraphView(this.productId, this.endDate).subscribe(data=>{
      var nodeData = data.nodes.map(c=>{
        if (c.group == "products"){
          return { id: c.id, label: c.name, group: "0", shape: 'diamond' };
        }
        else if (c.group == "services"){          
          if (c.budget >= 0 )
          {            
            return { id: c.id, value: c.importance, label: c.name, shape: 'hexagon', title: String(c.availability),
                  font:{ color: fgText },
                  color: {background:success, border: primaryLight , 
                  highlight:{background:successLight, border: primaryLight},
                  hover:{background:successLight, border: primaryLight}}};              
          }          
          else{
            return { id: c.id, value: c.importance, label: c.name, shape: 'hexagon',title: String(c.availability),
                  font:{ color: fgText },
                  color: {background: danger, border: primaryLight, 
                  highlight:{background: dangerLight, border: primaryLight},
                  hover:{background:dangerLight, border: primaryLight}}};
          }          
        }
        else if (c.group == "features"){
          return { id: c.id, value: 15, label: c.name, group: "2", shape: 'dot', title: c.name, 
                    font:{ color: fgText },
                    color: {background:success, border: primaryLight , 
                    highlight:{background:successLight, border: primaryLight},
                    hover:{background:successLight, border: primaryLight}}};
        }        
      });
      var edgeData = data.edges.map(c=>{
        const ava = String(c.budget);
        if (c.budget >= 0){          
          return { font: { size: 18, align: 'top', color: infoLight, strokeColor : infoLight }, label: ava,  from: c.from, to: c.to, color:{ color: success , highlight: successLight , hover: successLight}};
        }        
        else{
          return { font: { size: 18,  align: 'top', color: infoLight, strokeColor : infoLight},  label: ava, from: c.from, to: c.to, color:{ color:'red', highlight:'#dc143c', hover: '#dc143c'}};
        }        
      });
      const nodes = new VisNodes(nodeData);
      const edges = new VisEdges(edgeData);
      this.visNetworkData = {
        nodes,
        edges,
      };
      this.visNetworkOptions = {      
        physics:{
          enabled: true,
          barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 0
          },
          forceAtlas2Based: {
            gravitationalConstant: -40,
            centralGravity: 0.004,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 1
          },
          repulsion: {
            centralGravity: 0.2,
            springLength: 200,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09
          },
          hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09
          },
          maxVelocity: 50,
          minVelocity: 0.1,
          solver: 'forceAtlas2Based',
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
          },
          timestep: 0.5,
          adaptiveTimestep: true
        },
        layout: {
          improvedLayout:true,
          hierarchical: {
            enabled:false,
            levelSeparation: 200,
            nodeSpacing: 250,
            treeSpacing: 250,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'directed'   // hubsize, directed
          }
        },        
        nodes: {                                     
          shape: 'dot',          
          size: 30,
          font: {
              size: 32,
              color: '#ffffff'
          },
          color: {
            border: '#222222',
            background: '#666666'
          },
          borderWidth: 2,
          shadow:true,          
        },
        interaction: {hover: true},
        edges: {
            width: 3,            
            arrows: 'to',
            arrowStrikethrough: true,
            dashes: true,            
            scaling:{
              label: true,
            }
        },
        configure:{
          enabled: false          
        }
      };
    });
    /*
    this.portfolioGateway.getPortfolios(this.productId).subscribe(data=>{

      let nodeData = data.map(c=>{
        return { id: c.id, label: c.name, group: '1', shape: 'diamond' };
      });

      const nodesA = new VisNodes([
        { id: '1', label: 'Node 1', group: '0', shape: 'hexagon'},
        { id: '2', label: 'Node 2', group: '0', shape: 'triangle' },
        { id: '3', label: 'Node 3', group: '1', shape: 'diamond' },
        { id: '4', label: 'Node 4', group: '1'},
        { id: '5', label: 'Node 5', group: '2', title: 'Title of Node 5' }]);  

   
      
      const edgesa = new VisEdges([
          { from: '1', to: '3', color: {color:'red'} },
          { from: '1', to: '2', color:{inherit:'from'} },
          { from: '2', to: '4' },
          { from: '2', to: '5' }]);
        
      
      
    });
    
    */
    
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

    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }    
  }
}