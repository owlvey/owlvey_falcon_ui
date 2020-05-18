import { Component, OnInit, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { FormatService } from '../../../@core/utils/format.service';


@Component({
  selector: 'app-detail-source',
  templateUrl: './detail-source.component.html',
  styleUrls: ['./detail-source.component.scss']
})
export class DetailSourceComponent implements OnInit {
  
  constructor(
    private location: Location,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,    
    private toastr: NbToastrService,
    private theme: NbThemeService, 
    private format: FormatService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) {       

      
    }        

  ngOnInit() {         
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                              
      const sourceId = parseInt(paramMap.get('sourceId'));   
      const startDate = new Date(paramMap.get('start'));
      const endDate = new Date(paramMap.get('end'));                        
      this.sourcesGateway.getSourceWithAvailability(sourceId, startDate, endDate).subscribe(data=>{
        const sourceId = data.id;
        const group = data.group;
        const kind = data.kind;
        if (group == 'Availability'){
          if ( kind == 'Interaction' ){
            let queryParams: Params = { sourceId: sourceId, redirect: true };
            this.router.navigate(['/pages/sources/availability/interaction/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
          }
          else{
            let queryParams: Params = { sourceId: sourceId, redirect: true };
            this.router.navigate(['/pages/sources/availability/proportion/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
          }      
        }
        if (group == 'Latency')
        {
          let queryParams: Params = { sourceId: sourceId, redirect: true };
          this.router.navigate(['/pages/sources/latency/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
        }
        if (group == 'Experience'){
          if ( kind == 'Interaction' ){
            let queryParams: Params = { sourceId: sourceId, redirect: true };
            this.router.navigate(['/pages/sources/experience/interaction/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
          }
          else{
            let queryParams: Params = { sourceId: sourceId, redirect: true };
            this.router.navigate(['/pages/sources/experience/proportion/detail'], { relativeTo: this.activatedRoute, queryParams: queryParams, queryParamsHandling: 'merge' });     
          }      
        }
      });    
    });          
  }  
}