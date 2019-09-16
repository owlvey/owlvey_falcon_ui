import { Component, OnInit, ViewChildren, AfterViewInit, Input, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
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
  public visNetworkData: VisNetworkData;
  public visNetworkOptions: VisNetworkOptions;
  colors: any;


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
    this.buildGraph();
  }

  public loadProduct(){
      this.productGateway.getProduct(this.productId).subscribe(data=>{
          this.currentProduct = data;
      });
  }

  onNgOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      const echarts: any = config.variables.echarts;
      this.buildGraph();
    });
  }

  buildGraph(){
    if (!this.colors){
      return;
    }
    setTimeout(() => {
      this.visNetworkService.setOptions(this.visNetwork, { physics: false });
    }, 4000);

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
    this.productGateway.getGraphView(this.productId, this.startDate, this.endDate).subscribe(data=>{
      var nodeData = data.nodes.map(c=>{
        if (c.group == "products"){
          return { id: c.id, label: c.name, group: "0", shape: 'diamond' };
        }
        else if (c.group == "services"){
          if (c.budget >= 0 )
          {
            return { id: c.id, value: c.importance, label: c.name, shape: 'hexagon', title: String(c.value),
                  font:{ color: fgText },
                  color: {background:success, border: primaryLight ,
                  highlight:{background:successLight, border: primaryLight},
                  hover:{background:successLight, border: primaryLight}}};
          }
          else{
            return { id: c.id, value: c.importance, label: c.name, shape: 'hexagon',title: String(c.value),
                  font:{ color: fgText },
                  color: {background: danger, border: primaryLight,
                  highlight:{background: dangerLight, border: primaryLight},
                  hover:{background:dangerLight, border: primaryLight}}};
          }
        }
        else if (c.group == "features"){
          return { id: c.id, value: 14, label: c.name, group: "2", shape: 'dot', title: c.name,
                    font:{ color: fgText },
                    color: {background:success, border: primaryLight ,
                    highlight:{background:successLight, border: primaryLight},
                    hover:{background:successLight, border: primaryLight}}};
        }
      });
      var edgeData = data.edges.map(c=>{
        const ava = String(c.value);
        if (c.value < 0){

          return { font: {  align: 'top', color: fgText },
                label: ava, from: c.from, to: c.to, color:{ color: danger, highlight: dangerLight , hover: dangerLight}};
        }
        else if ( c.value >=0 && c.value < 0.01 )
        {
          //, strokeColor : infoLight
          return { font: {  align: 'top', color: fgText }, label: ava,
              from: c.from, to: c.to, color:{ color: warning , highlight: warningLight , hover: warningLight}};
        }
        else{
          return { font: {  align: 'top', color: fgText }, label: ava,
            from: c.from, to: c.to, color:{ color: success , highlight: successLight , hover: successLight}};
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
            gravitationalConstant: -90,
            centralGravity: 0.004,
            springConstant: 0.18,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 1.5
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
          maxVelocity: 146,
          minVelocity: 0.1,
          solver: 'forceAtlas2Based',
          timestep: 0.35,
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 25,
            onlyDynamicEdges: false,
            fit: false
          },
          adaptiveTimestep: false
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
          font: {
              color: '#ffffff'
          },
          color: {
            border: '#222222',
            background: '#666666'
          },
          borderWidth: 2,
          shadow:false,
        },
        interaction: {hover: true},
        edges: {
            labelHighlightBold:false,
            smooth: true,
            width: 3,
            font:{
              face: 'arial'
            },
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


  }

  onServiceRowSelect(event){
      const portfolioId = event.data.id;
      let queryParams: Params = { portfolioId: portfolioId };
      this.router.navigate(['/pages/portfolios/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
  }

  onReportClick(event) {
  }

  ngAfterViewInit() {

  }

  public networkInitialized(): void {
    // now we can use the service to register on events
    this.visNetworkService.on(this.visNetwork, 'click');

    // stop adjustments
    // open your console/dev tools to see the click params
    this.visNetworkService.stabilizationIterationsDone.subscribe((eventData: any[])=>{
    });
    this.visNetworkService.click
        .subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetwork) {
              console.log(eventData[1]);
            }
        });
  }

  onEditClick(event) {
    let queryParams: Params = { customerId: this.customerId, productId: this.productId };
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/products/edit'], extras);
  }

  public ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');

    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
  }
}
