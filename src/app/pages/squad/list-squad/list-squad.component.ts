import { Component, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { SquadsGateway } from './../../../@core/data/squads.gateway';
import { SourcesGateway } from './../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-list-squad',
  templateUrl: './list-squad.component.html',
  styleUrls: ['./list-squad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListSquadComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  settings = {
    mode: 'external',
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: true
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private location: Location,
    private squadGateway: SquadsGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private activatedRoute: ActivatedRoute,
    private toastr: NbToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.getSquads(parseInt(paramMap.get('customerId')));
    });    
    
  }

  getSquads(customerId) {
    this.squadGateway.getSquads(customerId).subscribe(data => {
      this.source.load(data);
    });
  }

  deleteSquad(item: any) {
    this.squadGateway.deleteSquad(item.id)
      .subscribe((data) => {
       //  this.getSquads();
      }, (error) => {
        this.toastr.danger("Something went wrong. Please try again.");
      })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteSquad(event.data)
    } else {
      event.confirm.reject();
    }
  }

  onCreate(event) {
    let queryParams: Params = {};
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/squads/create'], extras);
  }
  onEdit(event) {
    this.router.navigate(['/pages/squads/' + event.data.id]);
  }
  onSquadRowSelect(event) {
    const squadId = event.data.id;
    let queryParams: Params = { squadId: squadId, uheader: null };
    let extras: any = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    }
    this.router.navigate(['/pages/squads/detail'], extras);
  }
}
