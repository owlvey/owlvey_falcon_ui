import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { EventHandlerService } from '../../../../../App/src/app/event-handler.service';

@Component({
  selector: 'ngx-edit-squad',
  templateUrl: './edit-squad.component.html',
  styleUrls: ['./edit-squad.component.scss']
})
export class EditSquadComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;

  currentSquad: any = {};
  squadId = 0;

  createForm: FormGroup;
  formTitle: string;
  constructor(
    private location: Location,
    private squadGateway: SquadsGateway,
    private productGateway: ProductsGateway,
    private sourcesGateway: SourcesGateway,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      avatar: ['', Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.squadId = parseInt(paramMap.get('squadId'));
      this.getSquad();
    });
  }
  getSquad() {
    this.squadGateway.getSquad(this.squadId).subscribe(data => {
      this.createForm.get("id").setValue(data.id);
      this.createForm.get("name").setValue(data.name);
      this.createForm.get("description").setValue(data.description);
      this.createForm.get("avatar").setValue(data.avatar);
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
    let defer = this.squadGateway.updateSquad(this.createForm.get('id').value, this.createForm.value);
    defer.subscribe((data) => {
      this.toastr.success("Squad Updated Success", "Success");
      this.isLoading = false;
      this.eventHandler.event.next({ name: "reloadSquads" })
      this.location.back();
    }, (error) => {
      this.isLoading = false;
      this.toastr.warning("Something went wrong, please try again.", "Warning")
    });
  }
}
