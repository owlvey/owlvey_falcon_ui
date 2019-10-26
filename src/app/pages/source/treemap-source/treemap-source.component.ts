import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { CustomersGateway } from './../../../@core/data/customers.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-treemap-source',
  templateUrl: './treemap-source.component.html',
  styleUrls: ['./treemap-source.component.scss']
})
export class TreeMapSourceComponent extends ProductBaseComponent {

  echartsIntance: any;         
  sources: any[];
  sliOptions: any;
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    private sourcesGateway: SourcesGateway,    
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
  }    

  onChangeQueryParameters(paramMap: ParamMap): void {           
    super.onChangeQueryParameters(paramMap);
    this.getSource();    
  }

  
  getSource(){
    this.sourcesGateway.getSourcesWithAvailability(this.productId, this.startDate, this.endDate).subscribe(sources=>{
      this.sources = sources;
      this.renderAvailabilityReport();
    });
  }
  
  renderAvailabilityReport(){        
    const charData = this.sources.map(c=>{            
      return {
        sourceId: c.id,
        availability: c.availability,
        value: c.total,
        total: c.total,
        name : c.name,
        path: c.name
      };
    });

    
    this.sliOptions = {
      title: {
        text: this.currentProduct.name,
        left: 'center',
        show: null,
      },
      tooltip: {
        formatter: function (info) {            
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];

            for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
            }

            return [
                '<div class="tooltip-title">' + treePath.join('/') + '</div>',
                'Availability' + info.data.availability + '<br/>',
                'Total: ' + info.data.total,
            ].join('');
        }
      },
        series: [
        {
                name: this.currentProduct.name,
                type:'treemap',
                visibleMin: 1,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },                
                data: charData
        }]
    };
  }


  
  onChartInit(ec) {
    const router = this.router;
    this.echartsIntance = ec;
    this.echartsIntance.on('dblclick', (param)=>{
      if (typeof param.seriesIndex != 'undefined') {        
        const sourceId = param.data.sourceId;
        let queryParams: Params = { sourceId: sourceId };
        router.navigate(['/pages/sources/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });             
      }            
    });
  }
}
