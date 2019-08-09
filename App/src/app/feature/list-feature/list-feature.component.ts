import { Component, OnInit, ViewChildren } from "@angular/core";
import { EventHandlerService } from "./../../event-handler.service";
import { FeatureService } from "../feature.service";
import { ConfirmDeleteDirective } from "./../../../directives/confirm-delete.directive";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list-feature",
  templateUrl: "./list-feature.component.html",
  styleUrls: ["./list-feature.component.scss"],
  providers: [FeatureService]
})
export class ListFeatureComponent implements OnInit {
  @ViewChildren(ConfirmDeleteDirective) deleteDirective;
  isLoading: boolean = false;
  features: any[];
  actionConfirmWord: string;

  constructor(
    private eventHandler: EventHandlerService,
    private featureService: FeatureService,
    private toastr: ToastrService
  ) {
    this.eventHandler.event.subscribe((event: any) => {
      if (event && event.name === "reloadFeature") {
        this.getFeatures();
      }
    });
    this.actionConfirmWord = "delete";
  }

  ngOnInit() {
    this.getFeatures();
  }

  getFeatures() {
    this.isLoading = true;
    this.featureService.getFeatures().subscribe(
      (data: any[]) => {
        this.features = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  editFeature(item: any) {
    this.eventHandler.event.next({
      name: "createFeature",
      data: item
    });
  }

  deleteFeature(item: any) {
    console.log("Deleting", item);
    this.featureService.deleteFeature(item.id).subscribe(
      data => {
        this.deleteDirective.first.closeModal();
        this.getFeatures();
      },
      error => {
        this.deleteDirective.first.closeModal();
        this.toastr.error("Something went wrong. Please try again.");
      }
    );
  }

  openCreateModal() {
    this.eventHandler.event.next({
      name: "createFeature"
    });
  }
}
