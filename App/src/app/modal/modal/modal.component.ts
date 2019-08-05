import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EventHandlerService } from '../../event-handler.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('createGitProvider')
  public createGitProvider: ElementRef;

  constructor(
    private modalService: NgbModal,
    private eventHandlerService: EventHandlerService
  ) {
    this.eventHandlerService.event.subscribe((event: any) => {
      let component: any = null;

      if (event.name === 'createGitProvider') {
        //component = AppCOmponent;
      }

      let options: NgbModalOptions = {
        backdrop: 'static',
      }

      if (event.size && event.size != '') {
        options.windowClass = event.size
      } else {
        options.size = 'lg'
      }

      let modal: any = null;
      if (component) {
        modal = this.modalService.open(component, options);
      }

      if (modal && event.data) {
        modal.componentInstance.data = event.data;
      }
    });
  }

  ngOnInit() {
    //console.log('Modal Up');
  }

}
