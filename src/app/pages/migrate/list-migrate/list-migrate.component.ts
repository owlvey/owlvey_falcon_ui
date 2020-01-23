import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { NbThemeService } from '@nebular/theme';
import 'rxjs/Rx' ;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-migrate',
  templateUrl: './list-migrate.component.html',
  styleUrls: ['./list-migrate.component.scss']
})
export class ListMigrateComponent extends CustomerBaseComponent {
  form: FormGroup;
  loading: boolean = false;
  
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {       
      super(location, customerGateway, theme, router, activatedRoute);
      this.createForm();
    }   
    createForm() {
      this.form = this.fb.group({        
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

    onSubmit() {
      const formModel = this.prepareSave();
      this.loading = true;

      this.customerGateway.importMetadata(this.customerId, formModel).subscribe(data=>{        
        alert('done!');
        this.loading = false;
      }, (error:any) => {
        this.loading = false;
      });
    }
  
    clearFile() {
      this.form.get('data').setValue(null);
      this.fileInput.nativeElement.value = '';
    }
    
    onDataBackup(){
      this.customerGateway.exportData(this.customerId).subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = this.currentCustomer.name + "-data.xlsx";
        anchor.href = url;
        anchor.click();
      });
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

    onExportMetadata(){

      //window.location.href='http://example.com/myuri/report?param=x';
      this.customerGateway.exportMetadata(this.customerId).subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);

        var anchor = document.createElement("a");
        var body = document.getElementsByTagName('body')[0];
        anchor.download = this.currentCustomer.name + "-metadata.xlsx";
        anchor.href = url;
        anchor.target = "_blank";
        body.appendChild(anchor);
        anchor.click();
        body.removeChild(anchor);
      });
    }
}
