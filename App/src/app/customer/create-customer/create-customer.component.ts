import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { EventHandlerService } from './../../event-handler.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
  providers: [CustomerService]
})
export class CreateCustomerComponent implements OnInit {
  createForm: FormGroup;
  data: any;
  type: string;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private eventHandler: EventHandlerService,
  ) {
    this.createForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      description: [''],
      avatar: [''],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.loadCustomerInfo();
  }

  loadCustomerInfo() {
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
      this.toastr.warning("Please check the form fields are filled correctly.")
      return;
    }      

    let defer = null;

    if (this.type === "create")
      defer = this.customerService.createCustomer(this.createForm.value);
    else
      defer = this.customerService.updateCustomer(this.createForm.get("id").value, this.createForm.value);

    defer
      .subscribe((data) => {
        console.log(data);
        this.modal.close();
        this.eventHandler.event.next({name: "reloadCustomers"})
      }, (error) => {
        console.error(error);
      });
  }
}
