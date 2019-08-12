import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { EventHandlerService } from "../../event-handler.service";
import { CreateCustomerComponent } from "src/app/customer/create-customer/create-customer.component";
import { CreateFeatureComponent } from "src/app/feature/create-feature/create-feature.component";
import { CreatePortfolioComponent } from "src/app/portfolio/create-portfolio/create-portfolio.component";
import { FormSquadComponent } from "src/app/squad/form-squad/form-squad.component";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @ViewChild("createGitProvider")
  public createGitProvider: ElementRef;

  constructor(
    private modalService: NgbModal,
    private eventHandlerService: EventHandlerService
  ) {
    this.eventHandlerService.event.subscribe((event: any) => {
      let component: any = null;

      switch (event.name) {
        case "createCustomer":
          component = CreateCustomerComponent;
          break;
        case "createFeature":
          component = CreateFeatureComponent;
          break;
          case "createPortfolio":
          component = CreatePortfolioComponent;
          break;
        case "formSquad":
          component = FormSquadComponent;
          break;
      }

      let options: NgbModalOptions = {
        backdrop: "static"
      };

      if (event.size && event.size != "") {
        options.windowClass = event.size;
      } else {
        options.size = "lg";
      }

      let modal: any = null;
      if (component) {
        modal = this.modalService.open(component, options);
        modal.componentInstance.data = event.data;
        modal.componentInstance.opts = event.opts || {};
      }
    });
  }

  ngOnInit() {}
}
