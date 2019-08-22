import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { SourcesGateway } from '../../../@core/data/sources.gateway';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { EventHandlerService } from '../../../event-handler.service';


@Component({
  selector: 'app-create-squad',
  templateUrl: './create-squad.component.html',
  styleUrls: ['./create-squad.component.scss']
})
export class CreateSquadComponent implements OnInit {

  isLoading: boolean = false;
  sources: any[];
  actionConfirmWord: string;
  customerId: 0;
  squad: any = {};
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
      customerId: [0, Validators.required],
      name: ['', Validators.required]      
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {                        
      this.createForm.get('customerId').setValue(parseInt(paramMap.get('customerId'))); 
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
    let  defer = this.squadGateway.createSquad(this.createForm.value);
    defer.subscribe((data) => {
        this.toastr.success("Squad Created Success");
        this.isLoading = false;
        this.eventHandler.event.next({ name: "reloadSquads" })
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
