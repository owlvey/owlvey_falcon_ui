import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { NbThemeService } from '@nebular/theme';
import 'rxjs/Rx' ;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../common/components/base-component';

@Component({
  selector: 'app-list-migrate',
  templateUrl: './list-migrate.component.html',
  styleUrls: ['./list-migrate.component.scss']
})
export class ListMigrateComponent extends BaseComponent {
  

  form: FormGroup;
  formV2: FormGroup;

  loading: boolean = false;
  
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  
  public customerId : number; 

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {       
      super(location, theme, router, activatedRoute);
      this.createForm();
      
    }   

    onChangeQueryParameters(paramMap: ParamMap): void {
      this.customerId = parseInt(paramMap.get('customerId'));        
    }
    onNgOnInit(): void {
      
    }

    createForm() {
      this.form = this.fb.group({        
        data: null
      });
      this.formV2 = this.fb.group({
        data: null
      });
    }
    

    onFileChange(event) {
      //https://nehalist.io/uploading-files-in-angular2/
      if(event.target.files.length > 0) {
        let file = event.target.files[0];
        this.form.get('data').setValue(file);
      }
    }
    private prepareSave(): any {
      let input = new FormData();      
      input.append('data', this.form.get('data').value);
      return input;
    }

 
    
  
    clearFile() {
      this.form.get('data').setValue(null);
      this.fileInput.nativeElement.value = '';
    }
       

    onBackupMetadata(){
      this.customerGateway.backupMetadata().subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = "owlvey-metadata-backup.xlsx";
        anchor.href = url;
        anchor.click();
      });
    }
    onBackupDataV2(){
      this.customerGateway.backupData().subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = "owlvey-backup.xlsx";
        anchor.href = url;
        anchor.click();
      });
    }
    onSubmitV2(){
      const formModel = this.prepareSaveV2();
      this.loading = true;

      this.customerGateway.restore(formModel).subscribe( _ =>{        
        alert('done!');
        this.loading = false;
      }, (error:any) => {
        this.loading = false;
      });
    }

    private prepareSaveV2(): any {
      let input = new FormData();      
      input.append('data', this.formV2.get('data').value);
      return input;
    }
    onFileChangeV2(event) {
      //https://nehalist.io/uploading-files-in-angular2/
      if(event.target.files.length > 0) {
        let file = event.target.files[0];
        this.formV2.get('data').setValue(file);
      }
    }
}
