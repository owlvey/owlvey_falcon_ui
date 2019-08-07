import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
  providers: [CustomerService]
})
export class CreateCustomerComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      avatar: [''],
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.createForm.valid)
      this.toastr.warning("Please check the form fields are filled correctly.")

    this.customerService.createCustomer(this.createForm.value)
      .subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.error(error);
      })
  }
}
