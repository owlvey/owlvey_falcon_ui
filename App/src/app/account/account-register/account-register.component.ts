import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventHandlerService } from 'src/app/event-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss']
})
export class AccountRegisterComponent implements OnInit {

  errorsNames: any[] = [];
  errors: any;
  btnSubmitText: string = 'Sign Up';
  formIsSending: boolean = false;
  loading: boolean = true;
  createForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventHandlerService: EventHandlerService,
    private accountService: AccountService,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  onSubmit() {
    
  }

}
