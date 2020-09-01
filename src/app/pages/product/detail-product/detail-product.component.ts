import { Component, OnInit, ViewChildren, AfterViewInit, Input, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { JourneysGateway } from '../../../@core/data/portfolios.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { Edge, Data, DataSet, Options,  VisNetworkService } from 'ngx-vis'
import { NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { strictEqual } from 'assert';


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
  themeSubscription: any;

  public visNetworkAvailability: string = 'networkIdAvailability';
  public visNetworkAvailabilityData: Data;
  public visNetworkAvailabilityOptions: Options;


  public visNetworkLatency: string = 'networkIdLatency';
  public visNetworkLatencyData: Data;
  public visNetworkLatencyOptions: Options;

  public visNetworkExperience: string = 'networkIdExperience';
  public visNetworkExperienceData: Data;
  public visNetworkExperienceOptions: Options;

  colors: any;


  constructor(
    protected location: Location,
    private toastr: NbToastrService,
    protected customerGateway: CustomersGateway,
    protected productGateway: ProductsGateway,
    protected sourcesGateway: SourcesGateway,
    protected featuresGateway: FeaturesGateway,
    protected portfolioGateway: JourneysGateway,
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
    this.buildAvailabilityGraph();
  }

  public loadProduct(){
      this.productGateway.getProduct(this.productId).subscribe(data=>{
          this.currentProduct = data;
      });
  }

  onNgOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.buildAvailabilityGraph();
      this.buildLatencyGraph();
      this.buildExperienceGraph();
    });
  }

  buildGraphControl(response){
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
    var nodeData = response.nodes.map(c=>{
      if (c.group == "products"){
        return { id: c.id, label: c.name, group: "0", shape: 'diamond' };
      }
      else if (c.group == "journeys"){
        if (c.budget >= 0 )
        {
          return { id: c.id, value: 12,
                label: c.name, shape: 'hexagon', title: String(c.value),
                font:{ color: fgText },
                color: {background:success, border: primaryLight ,
                highlight:{background:successLight, border: primaryLight},
                hover:{background:successLight, border: primaryLight}}};
        }
        else{
          return { id: c.id, value: 12,
                label: c.name, shape: 'hexagon', title: String(c.value),
                font:{ color: fgText },
                color: {background: danger, border: primaryLight,
                highlight:{background: dangerLight, border: primaryLight},
                hover:{background:dangerLight, border: primaryLight}}};
        }
      }
      else if (c.group == "features"){
        return { id: c.id, value: 10,
                  label: `${c.name} [${c.value}]`, group: "2", shape: 'dot', title: c.name,
                  font:{ color: fgText },
                  color: {background:success, border: primaryLight ,
                  highlight:{background:successLight, border: primaryLight},
                  hover:{background:successLight, border: primaryLight}}};
      }
    });
    var edgeData = response.edges.map(c=>{
      const ava = String(c.value);
      if (c.value < 0){
        return { font: { bold: false, strokeWidth:0, align: 'top', color: fgText },
              label: ava, from: c.from, to: c.to, color:{ color: danger, highlight: dangerLight , hover: dangerLight}};
      }
      else if ( c.value >=0 && c.value < 0.01 )
      {
        //, strokeColor : infoLight
        return { font: {  bold: false, align: 'top', color: fgText }, label: ava,
            from: c.from, to: c.to, color:{ color: warning , highlight: warningLight , hover: warningLight}};
      }
      else{
        return { font: {  bold: false, align: 'top', color: fgText }, label: ava,
          from: c.from, to: c.to, color:{ color: success , highlight: successLight , hover: successLight}};
      }
    });
    let visNetworkData = {
      nodes: nodeData,
      edges: edgeData,
    };

    let visNetworkOptions = {
      physics:{
        enabled: true,
        forceAtlas2Based: {
          gravitationalConstant: -290,
          centralGravity: 0.004,
          springConstant: 0.18,
          springLength: 100,
          damping: 0.4,
          avoidOverlap: 1.5
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
        improvedLayout: false,
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
          smooth: false,
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
    return {
      data: visNetworkData,
      options: visNetworkOptions
    };
  }
  buildAvailabilityGraph(){
    if (!this.colors){ return; }
    setTimeout(() => {
      this.visNetworkService.setOptions(this.visNetworkAvailability, { physics: false });
    }, 4000);
    this.productGateway.getGraphAvailabilityView(this.productId, this.startDate, this.endDate).subscribe(data=>{
      const result = this.buildGraphControl(data);
      this.visNetworkAvailabilityData = result.data;
      this.visNetworkAvailabilityOptions = result.options;
    });
  }
  buildLatencyGraph(){
    if (!this.colors){ return; }
    setTimeout(() => {
      this.visNetworkService.setOptions(this.visNetworkLatency, { physics: false });
    }, 4000);
    this.productGateway.getGraphLatencyView(this.productId, this.startDate, this.endDate).subscribe(data=>{
      const result = this.buildGraphControl(data);
      this.visNetworkLatencyData = result.data;
      this.visNetworkLatencyOptions = result.options;
    });
  }
  buildExperienceGraph(){
    if (!this.colors){ return; }
    setTimeout(() => {
      this.visNetworkService.setOptions(this.visNetworkExperience, { physics: false });
    }, 4000);
    this.productGateway.getGraphExperienceView(this.productId, this.startDate, this.endDate).subscribe(data=>{
      const result = this.buildGraphControl(data);
      this.visNetworkExperienceData = result.data;
      this.visNetworkExperienceOptions = result.options;
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

  public networkAvailabilityInitialized(): void {

    // now we can use the service to register on events
    this.visNetworkService.on(this.visNetworkAvailability, 'click');
    // stop adjustments
    // open your console/dev tools to see the click params
    this.visNetworkService.stabilizationIterationsDone.subscribe((eventData: any[])=>{
    });
    this.visNetworkService.click
        .subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetworkAvailability) {
              console.log(eventData[1]);
            }
        });
  }
  public networkLatencyInitialized(): void {

    this.visNetworkService.on(this.visNetworkLatency, 'click');
    this.visNetworkService.stabilizationIterationsDone.subscribe((eventData: any[])=>{ });
  }
  public networkExperienceInitialized(): void {
    this.visNetworkService.on(this.visNetworkExperience, 'click');

    this.visNetworkService.stabilizationIterationsDone.subscribe((eventData: any[])=>{ });
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
    this.visNetworkService.off(this.visNetworkAvailability, 'click');
    this.visNetworkService.off(this.visNetworkLatency, 'click');
    this.visNetworkService.off(this.visNetworkExperience, 'click');

    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
  }
  onDeleteClick(event){
    if (window.confirm('Are you sure you want to delete?')) {
      this.productGateway.deleteProduct(this.productId).subscribe(res=>{
        this.toastr.success("Product was deleted");
        let queryParams: Params = { productId : null };
        this.router.navigate(['/pages/products'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
    } else {
      event.confirm.reject();
    }
  }
}
