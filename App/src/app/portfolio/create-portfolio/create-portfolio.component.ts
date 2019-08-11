import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PortfolioService } from "../portfolio.service";
import { EventHandlerService } from "./../../event-handler.service";

@Component({
  selector: "app-create-portfolio",
  templateUrl: "./create-portfolio.component.html",
  styleUrls: ["./create-portfolio.component.scss"],
  providers: [PortfolioService]
})
export class CreatePortfolioComponent implements OnInit {
  createForm: FormGroup;
  data: any;
  type: string;
  isLoading: boolean;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private portfolioService: PortfolioService,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      id: [0, Validators.required],
      name: ["", Validators.required],
      productId: ["", Validators.required],
      description: [""],
      slo: [""]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    console.log(this.data);
    this.loadPortfolioInfo();
  }

  loadPortfolioInfo() {
    if (!this.data) {
      this.type = "create";
    } else {
      this.type = "update";

      this.createForm.get("id").setValue(this.data.id);
      this.createForm.get("name").setValue(this.data.name);
      this.createForm.get("slo").setValue(this.data.slo);
      this.createForm.get("productId").setValue(this.data.productId);
    }
  }

  onSubmit() {
    this.createForm.get('productId').setValue(1);

    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.");
      return;
    }

    let defer = null;

    this.isLoading = true;
    if (this.type === "create")
      defer = this.portfolioService.createPortfolio(this.createForm.value);
    else
      defer = this.portfolioService.updatePortfolio(
        this.createForm.get("id").value,
        this.createForm.value
      );

    defer.subscribe(
      data => {
        console.log(data);
        this.modal.close();
        this.eventHandler.event.next({ name: "reloadPortfolios" });
      },
      error => {
        this.isLoading = false;
        console.error(error);
        this.toastr.warning("Something went wrong, please try again.");
      }
    );
  }
}
