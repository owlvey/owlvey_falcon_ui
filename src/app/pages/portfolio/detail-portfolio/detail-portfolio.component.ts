import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { PortfoliosGateway } from '../../../@core/data/portfolios.gateway';
import { FeaturesGateway } from '../../../@core/data/features.gateway';
import { VisNetworkData, VisNetworkOptions, VisNetworkService, VisNodes, VisEdges } from 'ngx-vis';


@Component({
  selector: 'app-detail-portfolio',
  templateUrl: './detail-portfolio.component.html',
  styleUrls: ['./detail-portfolio.component.scss']
})
export class DetailPortfolioComponent implements OnInit {
  
  currentFeature : any;
  echartsIntance: any;
  echartCalendarInstance: any;
  serviceCalendarOptions: any;
  isLoading: boolean = false;  
  actionConfirmWord: string;
  currentSource : any= { impact: 0, availability: 0, slo: 0, budget: 0};    
  productId = 0;
  portfolioId = 0;
  themeSubscription: any;
  options: any = {};
  series: Array<any> = [];
  startDate: Date = new Date();
  endDate: Date;  
  source: LocalDataSource = new LocalDataSource();
  
  settings = {    
    mode: 'external',
    actions:{
      columnTitle:'Delete',
      width: '3em',
      position: 'right',
      add:false,
      edit:false,
      delete:false
    },    
    pager: {
      perPage: 20
    },
    columns: {            
      sequence: {
        title: 'IX',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },   
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },                
      name: {
        title: 'Name',
        type: 'string',
        filter: false,        
        editable: false
      },                     
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
                 
    },
  };
  /*
   featureSlo: {
        title: 'SLO',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },        
      budget: {
        title: 'Budget',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },  
   mttd: {
        title: 'MTTD',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },          
      mtte: {
        title: 'MTTE',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },          
      mttf: {
        title: 'MTTF',
        type: 'number',
        filter: false,
        width: '10rem',
        editable: false
      },                
  */
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private toastr: NbToastrService,
    private featuresGateway: FeaturesGateway,    
    private portfolioGateway: PortfoliosGateway,    
    private theme: NbThemeService,
    private router: Router, 
    protected visNetworkService: VisNetworkService,
    private activatedRoute: ActivatedRoute) {       
      
    }        

  ngOnInit() {         
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.productId = parseInt(paramMap.get('productId'));            
      this.portfolioId = parseInt(paramMap.get('portfolioId'));   
      this.startDate = new Date(paramMap.get('start'));
      this.endDate = new Date(paramMap.get('end'));      
      this.getPortfolio();
      this.getDaily(); 
      this.buildGraphDependencies();
    });          
  }  

  private buildGraphDependencies(){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      const echarts: any = config.variables.echarts;      

      this.portfolioGateway.getPortfolioGraph(this.portfolioId, this.startDate, this.endDate).subscribe( data =>{
        this.buildGraph(data);
      });      

    });
  }

  private buildGraph(data){
    if (!this.colors){
      return;
    }
    setTimeout(() => {

      this.visNetworkService.setOptions(this.visNetwork, { physics: false });                  
      this.visNetworkService.moveTo( this.visNetwork , {
                  position: {x:-300, y:-300},
                  scale: 1,
                  animation: true                  
      } );     

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
    var nodeData = data.nodes.map(c=>{      
      if (c.group == "products"){
        return { id: c.id, label: c.name, group: "0", shape: 'diamond' };
      }
      else if (c.group == "services"){
        if (c.budget >= 0 )
        {
          //c.importance
          return { id: c.id, value: 12, label: c.name, shape: 'hexagon', 
                title: String(c.value),
                font:{ color: fgText },
                color: {background:success, border: primaryLight ,
                highlight:{background:successLight, border: primaryLight},
                hover:{background:successLight, border: primaryLight}}};
        }
        else{
          return { id: c.id, value: 12, 
                label: c.name, shape: 'hexagon',title: String(c.value),
                font:{ color: fgText },
                color: {background: danger, border: primaryLight,
                highlight:{background: dangerLight, border: primaryLight},
                hover:{background:dangerLight, border: primaryLight}}};
        }
      }
      else if (c.group == "features"){
        return { id: c.id, value: 10, label: c.name, group: "2", shape: 'dot', title: c.name,
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
        improvedLayout: true,       
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
  }

  getPortfolio(){    
    this.portfolioGateway.getPortfolioWithAvailabilities(this.portfolioId, this.startDate, this.endDate).subscribe(data=>{      
      this.currentSource = data;                  
      const features = this.currentSource.features.map(c=>{                
        return c;        
      });

      this.source.load(features);      
      this.renderAvailabilityReport();
    });    
  }  
  

  getDaily(){
    this.portfolioGateway.getDaily(this.portfolioId, this.startDate, this.endDate).subscribe(data=>{
      this.series = data.series;
      const slo = data.slo;
      const datas = this.series[0].items.map(c=>{        
        let target = 0; 
        if ( c.oAva >= slo){
          target = 100;
        }
        return [ echarts.format.formatTime('yyyy-MM-dd', c.date), target, c.oAva];
      });      
      
      this.serviceCalendarOptions = {
        tooltip: {
          formatter: function (params) {              
              const ava = datas.filter(c=> c[0] === params.value[0])[0][2];              
              return params.value[0] + ' | SLO: ' + slo + ' , availability:' + ava;
          }
        },
        visualMap: {
            show: false,
            inRange: {
              color: ['#cc0033', '#ff9933', '#ffde33', '#096'],
              opacity: 0.8
            },
            min: 0,
            max: 100
        },
        calendar: {
            range: String((new Date()).getFullYear())
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: datas.map(c=>[c[0], c[1]]),        
        }
      };
    });  
  }

  squadSource: LocalDataSource = new LocalDataSource();
  indicatorSource : LocalDataSource = new LocalDataSource();
  squadsSettings = {
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 5
    },
    columns: {      
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      }      
    }
  };

  indicatorSettings = {    
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    pager: {
      perPage: 10
    },
    columns: {      
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        sort:true,
        width: '3em',
        sortDirection: 'asc'     
      },
      source: {
        title: 'SLI',
        type: 'string',
        filter: false
      },    
      availability: {
        title: 'Availability',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false,        
      },                 
    },
  };
  
  onFeaturesRowSelect(event){      
      this.currentFeature = event.data;
      const featureId = event.data.id;
      const slo = event.data.featureSlo;
      this.featuresGateway.getFeatureWithAvailabilities(featureId, this.startDate, this.endDate).subscribe(feature=>{        
        const temporal = feature.indicators;
        const indicators = temporal.map(c=>{
          c.indicatorSlo = Math.round(Math.pow(slo, 1/temporal.length) * 10000) /10000;
          c.budget =  Math.round( (c.availability - c.indicatorSlo) * 10000) /10000;
          return c;
        });

        this.indicatorSource.load(indicators);
        this.squadSource.load(feature.squads);                
        
      });  
  } 
  onReportClick(event){
    this.getDaily(); 
  }

  onEditClick(event){      
      let queryParams: Params = { };      
      this.router.navigate(['/pages/portfolios/edit'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onDeleteClick(event){     
    if (window.confirm('Are you sure you want to delete?')) {
      this.portfolioGateway.deletePortfolio(this.portfolioId).subscribe(data=>{
        this.toastr.success("Portfolio was deleted");
        let queryParams: Params = { portfolioId : null };
        this.router.navigate(['/pages/portfolios'], {         
          queryParams: queryParams, 
          queryParamsHandling: 'merge' });     
  
      }, (error) => {      
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });  
    }
    else {

    }   
     
    
  } 
  onBackClick(event){        
    this.location.back();
  }


  onIndicatorsRowSelect(event){
    const sourceId = event.data.sourceId;
    let queryParams: Params = { sourceId: sourceId };
    this.router.navigate(['/pages/sources/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }
  onSquadRowSelect(event){
    const squadId = event.data.id;
    let queryParams: Params = { squadId: squadId };
    this.router.navigate(['/pages/squads/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
  }

  renderAvailabilityReport(){         
    let legends = [];    
    const debt = this.currentSource.features.filter((c: any) => c.availability <= this.currentSource.slo);
    let  totaldebt: number = 0;
    debt.forEach(c => {
      totaldebt  += Math.abs(this.currentSource.slo - c.availability);      
    });
      
    if (totaldebt === 0){
      return;
    }

    const indicators = debt.map(c=>{
      legends.push(c.name);            
      return {
        name: c.name, 
        value:  Math.abs(this.currentSource.slo - c.availability) / totaldebt
      };

    });
        
    this.sliOptions ={
      title : {
          text: "Availability Feature Debt: " + totaldebt,          
          x:'center',          
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/> {b} : {c} ( {d}% ) "
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: legends
      },
      series : [
          {
              name: 'Debt',
              type: 'pie',
              radius : '70%',
              center: ['50%', '60%'],
              data: indicators,
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };
  
  }

  sliOptions:any; 
  sliEchartsIntance: any;

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onSliChatInit(e){
    this.sliEchartsIntance = e;
  }

  
  onServiceCalendar(ec) {
    this.echartCalendarInstance = ec;
  }


  public visNetwork: string = 'networkId1';
  public visNetworkData: VisNetworkData;
  public visNetworkOptions: VisNetworkOptions;
  colors: any;
  graphData = {};

  public networkInitialized(): void {
        
  }

//region
  

}