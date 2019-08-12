import { Component, OnInit, ViewChildren } from "@angular/core";
import { EventHandlerService } from "./../../event-handler.service";
import { PortfolioService } from "../portfolio.service";
import { ConfirmDeleteDirective } from "./../../../directives/confirm-delete.directive";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list-portfolio",
  templateUrl: "./list-portfolio.component.html",
  styleUrls: ["./list-portfolio.component.scss"],
  providers: [PortfolioService]
})
export class ListPortfolioComponent implements OnInit {
  @ViewChildren(ConfirmDeleteDirective) deleteDirective;
  isLoading: boolean = false;
  portfolios: any[];
  actionConfirmWord: string;
  productId = 1;

  constructor(
    private eventHandler: EventHandlerService,
    private portfolioService: PortfolioService,
    private toastr: ToastrService
  ) {
    this.eventHandler.event.subscribe((event: any) => {
      if (event && event.name === "reloadPortfolio") {
        this.getPortfolios();
      }
    });
    this.actionConfirmWord = "delete";
  }

  ngOnInit() {
    this.getPortfolios();
  }

  getPortfolios() {
    this.isLoading = true;
    this.portfolioService.getPortfolios(this.productId).subscribe(
      (data: any[]) => {
        this.portfolios = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  editPortfolio(item: any) {
    this.eventHandler.event.next({
      name: "createPortfolio",
      data: item
    });
  }

  deletePortfolio(item: any) {
    console.log("Deleting", item);
    this.portfolioService.deletePortfolio(item.id).subscribe(
      data => {
        this.deleteDirective.first.closeModal();
        this.getPortfolios();
      },
      error => {
        this.deleteDirective.first.closeModal();
        this.toastr.error("Something went wrong. Please try again.");
      }
    );
  }

  openCreateModal() {
    this.eventHandler.event.next({
      name: "createPortfolio"
    });
  }
}
