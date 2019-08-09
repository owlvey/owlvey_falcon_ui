import { Component, OnInit, ViewChildren } from "@angular/core";
import { EventHandlerService } from "./../../event-handler.service";
import { SquadService } from "../squad.service";
import { ConfirmDeleteDirective } from "./../../../directives/confirm-delete.directive";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list-squad",
  templateUrl: "./list-squad.component.html",
  styleUrls: ["./list-squad.component.scss"],
  providers: [SquadService]
})
export class ListSquadComponent implements OnInit {
  @ViewChildren(ConfirmDeleteDirective) deleteDirective;
  isLoading: boolean = false;
  squads: any[];
  actionConfirmWord: string;

  constructor(
    private eventHandler: EventHandlerService,
    private squadService: SquadService,
    private toastr: ToastrService
  ) {
    this.eventHandler.event.subscribe((event: any) => {
      if (event && event.name === "reloadSquads") {
        this.getSquads();
      }
    });
    this.actionConfirmWord = "delete";
  }

  ngOnInit() {
    this.getSquads();
  }

  getSquads() {
    this.isLoading = true;
    this.squadService.getSquads().subscribe(
      (data: any[]) => {
        this.squads = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  editSquad(item: any) {
    this.eventHandler.event.next({
      name: "createSqud",
      data: item
    });
  }

  deleteSquad(item: any) {
    console.log("Deleting", item);
    this.squadService.deleteSquad(item.id).subscribe(
      data => {
        this.deleteDirective.first.closeModal();
        this.getSquads();
      },
      error => {
        this.deleteDirective.first.closeModal();
        this.toastr.error("Something went wrong. Please try again.");
      }
    );
  }

  openCreateModal() {
    this.eventHandler.event.next({
      name: "createSquad"
    });
  }
}
