import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventHandlerService } from '../../event-handler.service';

@Component({
  selector: 'app-modal-sidebar',
  templateUrl: './modal-sidebar.component.html',
  styleUrls: ['./modal-sidebar.component.scss']
})
export class ModalSidebarComponent implements OnInit {
  @ViewChild('createGitProvider')
  public createGitProvider: ElementRef;

  constructor(
    private modalService: NgbModal,
    private eventHandlerService: EventHandlerService
  ) {
    this.eventHandlerService.event.subscribe((event: any) => {
      let component: any = null;
      //console.log(event);
      if (event.name === 'previewPipeSidebar') {
        //component = PipePreviewComponent;
      }
      //debugger;
      //console.log(component);
      let modal: any = null;
      if (component) {
        modal = this.modalService.open(component, {
          backdropClass: 'sidebar-backdrop-class',
          windowClass: 'sidebar-modal',
          backdrop: 'static'
        });
      }

      if (modal && event.data) {
        modal.componentInstance.data = event.data;
      }
    });
  }

  ngOnInit() {
    //console.log('Modal Sidebar Up');
  }

}
