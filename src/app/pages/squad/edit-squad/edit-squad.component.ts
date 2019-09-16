import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SquadsGateway } from '../../../@core/data/squads.gateway';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { EventHandlerService } from '../../../../../src/app/event-handler.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-edit-squad',
  templateUrl: './edit-squad.component.html',
  styleUrls: ['./edit-squad.component.scss']
})
export class EditSquadComponent implements OnInit {

  isLoading: boolean = false;
  actionConfirmWord: string;

  currentSquad: any = {};
  squadId = 0;

  createForm: FormGroup;
  formTitle: string;

  settings = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:false,
      delete:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      perPage: 20
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: false,
        width: '3em',
        editable: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false
      }
    },
  };

  memberSettings = {
    mode: 'external',
    actions:{
      columnTitle:'Actions',
      position: 'right',
      add:false,
      edit:true,
      delete:false
    },
    edit: {
      editButtonContent: '<i class="nb-plus"></i>'
    },
    pager: {
      perPage: 20
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
        filter: true,
        width: '3em',
        editable: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: true,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  memberSource: LocalDataSource = new LocalDataSource();


  constructor(
    private location: Location,
    private squadGateway: SquadsGateway,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private router: Router,
    private eventHandler: EventHandlerService
  ) {
    this.createForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      avatar: ['', Validators.required]
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.squadId = parseInt(paramMap.get('squadId'));
      this.loadViewState();
    });
  }

  loadViewState(){
    this.getSquad();
    this.squadGateway.getMembersComplement(this.squadId).subscribe(data=>{
        this.memberSource.load(data);
    });
  }

  getSquad() {
    this.squadGateway.getSquad(this.squadId).subscribe(data => {
      this.createForm.get("id").setValue(data.id);
      this.createForm.get("name").setValue(data.name);
      this.createForm.get("description").setValue(data.description);
      this.createForm.get("avatar").setValue(data.avatar);
      this.source.load(data.members);
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
  onRegister(event){
    const userId = event.data.id;
    this.squadGateway.registerMember(this.squadId, userId).subscribe(data=>{
      this.loadViewState();
    });
  }
  onUnRegister(event){
    const userId = event.data.id;
    this.squadGateway.unRegisterMember(this.squadId, userId).subscribe(data=>{
      this.loadViewState();
    });
  }
}
