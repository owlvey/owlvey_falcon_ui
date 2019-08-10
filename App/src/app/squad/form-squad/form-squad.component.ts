import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SquadService } from "../squad.service";
import { EventHandlerService } from "./../../event-handler.service";

@Component({
  selector: "app-form-squad",
  templateUrl: "./form-squad.component.html",
  styleUrls: ["./form-squad.component.scss"],
  providers: [SquadService]
})
export class FormSquadComponent implements OnInit {
  createForm: FormGroup;
  data: any;
  opts: any;
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
    this.loadSquadInfo();
  }

  loadSquadInfo() {
    if (this.opts.isEditing) {
      this.createForm.get("id").setValue(this.data.id);
      this.createForm.get("name").setValue(this.data.name);
      this.createForm.get("avatar").setValue(this.data.avatar);
      this.createForm.get("description").setValue(this.data.description);
    }
  }

  onSubmit() {
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.");
      return;
    }
    let defer = null;
    this.isLoading = true;
    if (!this.opts.isEditing) {
      console.log("this.createForm.value: ", this.createForm.value);
      defer = this.squadService.createSquad({
        ...this.createForm.value,
        customerId: 1
      });
    } else {
      defer = this.squadService.updateSquad(
        this.createForm.get("id").value,
        this.createForm.value
      );
    }
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
