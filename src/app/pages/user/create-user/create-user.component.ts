import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UsersGateway } from '../../../@core/data/users.gateway';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  createForm: FormGroup;
  formTitle: string;
  constructor(
    private location: Location,
    private userGateway: UsersGateway,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,    
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm = this.fb.group({
      email: ['', Validators.email]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {

    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.createForm)
    if (!this.createForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }
    this.isLoading = true;
    let  defer = this.userGateway.createUser(this.createForm.value);
    defer.subscribe((data) => {
        this.toastr.success("Product Created Success");
        this.isLoading = false;        
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
