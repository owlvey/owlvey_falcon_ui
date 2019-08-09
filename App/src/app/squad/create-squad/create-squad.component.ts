import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SquadService } from "../squad.service";
import { EventHandlerService } from "./../../event-handler.service";

@Component({
  selector: "app-create-squad",
  templateUrl: "./create-squad.component.html",
  styleUrls: ["./create-squad.component.scss"],
  providers: [SquadService]
})
export class CreateSquadComponent implements OnInit {
  createForm: FormGroup;
  data: any;
  type: string;
  isLoading: boolean;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private squadService: SquadService,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      id: [0, Validators.required],
      name: ["", Validators.required],
      description: [""],
      avatar: [""]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    console.log(this.data);
    this.loadSquadInfo();
  }

  loadSquadInfo() {
    if (!this.data) {
      this.type = "create";
    } else {
      this.type = "update";

      this.createForm.get("id").setValue(this.data.id);
      this.createForm.get("name").setValue(this.data.name);
      this.createForm.get("avatar").setValue(this.data.avatar);
    }
  }

  onSubmit() {
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.");
      return;
    }

    let defer = null;

    this.isLoading = true;
    if (this.type === "create")
      defer = this.squadService.createSquad(this.createForm.value);
    else
      defer = this.squadService.updateSquad(
        this.createForm.get("id").value,
        this.createForm.value
      );

    defer.subscribe(
      data => {
        console.log(data);
        this.modal.close();
        this.eventHandler.event.next({ name: "reloadSquads" });
      },
      error => {
        this.isLoading = false;
        console.error(error);
        this.toastr.warning("Something went wrong, please try again.");
      }
    );
  }
}
