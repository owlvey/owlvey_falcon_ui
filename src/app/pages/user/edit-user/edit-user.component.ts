import { Component, OnInit, ViewChildren } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";
import { CustomersGateway } from "../../../@core/data/customers.gateway";
import { SourcesGateway } from "../../../@core/data/sources.gateway";
import { LocalDataSource } from "ng2-smart-table";
import { ProductsGateway } from "../../../@core/data/products.gateway";
import { UsersGateway } from "../../../@core/data/users.gateway";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "ngx-edit-member",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  isLoading: boolean = false;
  userId = 0;
  customerId = 0;
  editForm: FormGroup;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private userGateway: UsersGateway,
    private toastr: NbToastrService,
    private customerGateway: CustomersGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      id: [""],
      email: ["", Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.userId = parseInt(paramMap.get("userId"));
      this.customerId = parseInt(paramMap.get("customerId"));
      this.getUser();
    });
  }

  goBack() {
    this.location.back();
  }

  getUser() {
    this.userGateway.getUser(this.userId).subscribe(data => {
      this.editForm.get("id").setValue(data.id);
      this.editForm.get("email").setValue(data.email);
    });
  }

  onSubmit() {
    console.log(this.editForm);
    if (!this.editForm.valid) {
      this.toastr.warning(
        "Please check the form fields are filled correctly.",
        "Warning"
      );
      return;
    }

    this.isLoading = true;
    let defer = this.userGateway.updateUser(this.userId, this.editForm.value);
    defer.subscribe(
      data => {
        this.toastr.success("User Updated Success", "Success");
        this.isLoading = false;
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
