import { Component, OnInit, ViewChildren } from '@angular/core';
import { EventHandlerService } from './../../event-handler.service';
import { SourceService } from '../source.service';
import { ConfirmDeleteDirective } from './../../../directives/confirm-delete.directive';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from "./../../core/session/session.service"
import { Session } from 'inspector';

@Component({
  selector: 'app-list-Source',
  templateUrl: './list-Source.component.html',
  styleUrls: ['./list-Source.component.scss']
})
export class ListSourceComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  constructor(private eventHandler: EventHandlerService,
    private sourceService: SourceService,
    private sessionService: SessionService,
    private toastr: ToastrService) { }
  
  ngOnInit() {
    this.getSources();    
  }

  getSources() {
    this.isLoading = true;
    this.sourceService.getSources(this.sessionService.customer.id)
      .subscribe((data: any[]) => {
        this.sources = data;
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      })
  }

}
