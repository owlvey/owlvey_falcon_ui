import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventHandlerService } from 'src/app/event-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationToken } from '../../core/auth/authentication.class';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { environment } from 'src/environments/environment.sta';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit {

  errorsNames: any[] = [];
  errors: any;
  btnSubmitText: string = 'Log In';
  formIsSending: boolean = false;
  loading: boolean = true;
  createForm: FormGroup;
  forgotPasswordForm: FormGroup;
  applicationName: string = '';
  showForgotPassword: boolean = false;
  showForgotPasswordConfirm: boolean = false;
  titleForm: string = 'Sign In';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private eventHandlerService: EventHandlerService,
    private accountService: AccountService,
    private authService: AuthenticationService,
    private toastr: ToastrService) {
      this.applicationName = environment.applicationName;
    }

  ngOnInit() {
    this.createForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });

    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', Validators.required)
    });
  }

  onShowForgotPassword() {
    this.titleForm = 'Forgot your password?';
    this.showForgotPassword = true;
  }

  onSubmit() {
    this.formIsSending = true;
    this.btnSubmitText = 'Sign In ...';
    this.accountService.login(this.createForm.value)
      .subscribe((response: AuthorizationToken) => {
        console.log(response);
        this.authService.getUserInfo(response);
      }, (error: HttpErrorResponse) => {
        this.errorsNames = [];
        this.errors = {};

        switch (error.status) {
          case 400:
            for (let p in error.error) {
              this.errors = error.error;
              this.errorsNames.push(p);
            }
            break;
          case 409:
            let errorFormat = {};
            errorFormat['reason'] = [error.error.reason];
            for (let p in errorFormat) {
              this.errors = errorFormat;
              this.errorsNames.push(p);
            }
            break;
          default:
            this.toastr.error(error.error);
            break;
        }

        this.formIsSending = false;
        this.btnSubmitText = 'Log In';
      }
        , () => {

        }
      );
  }

  onForgotPasswordSubmit() {
    this.formIsSending = true;
    // this.btnSubmitText = 'Send ...';
    this.accountService.forgotPassword(this.forgotPasswordForm.value)
      .subscribe((response: any) => {
        this.formIsSending = false;
        this.titleForm = 'Forgot password confirmation';
        this.showForgotPasswordConfirm = true;
        this.forgotPasswordForm.reset();

      }, (error: HttpErrorResponse) => {
        this.errorsNames = [];
        this.errors = {};

        switch (error.status) {
          case 400:
            for (let p in error.error) {
              this.errors = error.error;
              this.errorsNames.push(p);
            }
            break;
          case 409:
            let errorFormat = {};
            errorFormat['reason'] = [error.error.reason];
            for (let p in errorFormat) {
              this.errors = errorFormat;
              this.errorsNames.push(p);
            }
            break;
          default:
            this.toastr.error(error.error);
            break;
        }

        this.formIsSending = false;
        // this.btnSubmitText = 'Log In';
      }
        , () => {

        }
      );
  }

  onShowLogin() {
    this.titleForm = 'Sign In';
    this.showForgotPassword = false;
    this.showForgotPasswordConfirm = false;
  }

}
