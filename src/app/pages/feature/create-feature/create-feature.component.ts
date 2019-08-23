import { Component, OnInit, ViewChildren } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { CustomersGateway } from "../../../@core/data/customers.gateway";
import { SourcesGateway } from "../../../@core/data/sources.gateway";
import { FeaturesGateway } from "../../../@core/data/features.gateway";
import { LocalDataSource } from "ng2-smart-table";
import { ProductsGateway } from "../../../@core/data/products.gateway";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { EventHandlerService } from "../../../event-handler.service";

@Component({
  selector: "app-create-feature",
  templateUrl: "./create-feature.component.html",
  styleUrls: ["./create-feature.component.scss"]
})
export class CreateFeatureComponent implements OnInit {
  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  customer: any = {};
  customerId = 0;

  createForm: FormGroup;
  formTitle: string;
  constructor(
    private location: Location,
    private featuresGateway: FeaturesGateway,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      id: [""],
      name: ["", Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.createForm);
    if (!this.createForm.valid) {
      this.toastr.warning(
        "Please check the form fields are filled correctly.",
        "Warning"
      );
      return;
    }

    this.isLoading = true;
    let defer = this.featuresGateway.createFeature(this.createForm.value);
    defer.subscribe(
      data => {
        this.toastr.success("Feature Created Success");
        this.isLoading = false;
        this.eventHandler.event.next({ name: "reloadFeatures" });
        this.location.back();
      },
      error => {
        this.isLoading = false;
        this.toastr.warning(
          "Something went wrong, please try again.",
          "Warning"
        );
      }
    );
  }
}
