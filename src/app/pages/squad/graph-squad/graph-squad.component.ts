import { Component, OnInit, ViewChildren, Input, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { Data, Options, VisNetworkService, DataSet, Node, Edge } from 'ngx-vis';


@Component({
  selector: 'app-graph-squad',
  templateUrl: './graph-squad.component.html',
  styleUrls: ['./graph-squad.component.scss']
})
export class GraphSquadComponent extends CustomerBaseComponent implements OnDestroy {
  themeSubscription: any;
  public visNetwork: string = 'networkId1';
  public visNetworkData: Data;
  public visNetworkOptions: Options;
  colors: any;

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,
    protected squadGateway: SquadsGateway,
    protected theme: NbThemeService,
    protected toastr: NbToastrService,
    protected router: Router,
    protected visNetworkService: VisNetworkService,
    protected activatedRoute: ActivatedRoute) {
      super(location, customerGateway, theme, router, activatedRoute);
    }
  onNgOnInit(){
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
    }, 3000);

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

    this.customerGateway.getSquadsGraph(this.customerId, this.startDate, this.endDate).subscribe(data=>{
      var nodeData = data.nodes.map(c=>{
        if (c.group == "squads"){
          return { id: c.id, value: 20, label: c.name, shape: 'hexagon', title: String(c.value),
                  font:{ color: fgText },
                  color: {background:success, border: primaryLight ,
                  highlight:{background:successLight, border: primaryLight},
                  hover:{background:successLight, border: primaryLight}}};
        }
        else {
          return { id: c.id, value: 12, label: c.name, shape: 'dot', title: c.name,
                  font:{ color: fgText },
                  color: {background:success, border: primaryLight ,
                  highlight:{background:successLight, border: primaryLight},
                  hover:{background:successLight, border: primaryLight}}};
        }
      });
      var edgeData = data.edges.map(c=>{
        const ava = String(c.value);
        if (c.value < 0){
          return { label: ava, from: c.from, to: c.to, color:{ color: danger, highlight: dangerLight , hover: dangerLight}};
        }
        else{
          return { label: ava,
            from: c.from, to: c.to, color:{ color: success , highlight: successLight , hover: successLight}};
        }
      });
      this.visNetworkData = {
        nodes: nodeData,
        edges: edgeData,
      };

      this.visNetworkOptions = {
        interaction:{
          tooltipDelay: 300
        },
        physics:{
          enabled: true,
          forceAtlas2Based: {
            gravitationalConstant: -90,
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
          improvedLayout:true,
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
        edges: {
            labelHighlightBold:false,
            smooth: false,
            width: 3,
            font:{
              face: 'arial',
              size: 14,
              color: fgText,
              align: 'top'
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
  onBackClick(event){
    this.location.back();
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

  ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');
    if (this.themeSubscription){
      this.themeSubscription.unsubscribe();
    }
  }
}
