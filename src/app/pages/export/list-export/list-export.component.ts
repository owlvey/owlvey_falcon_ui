import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import 'rxjs/Rx' ;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';
import { ProductsGateway } from '../../../@core/data/products.gateway';

@Component({
  selector: 'app-list-export',
  templateUrl: './list-export.component.html',
  styleUrls: ['./list-export.component.scss']
})
export class ListExportComponent extends ProductBaseComponent {  
  loading: boolean = false;   
  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    protected productGateway: ProductsGateway,        
    protected theme: NbThemeService,
    protected router: Router, 
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productGateway, theme, router, activatedRoute);
      this.createForm();
    }     
    createForm() {
      this.form = this.fb.group({        
        data: null
      });      
    }
    
    onExportItems(){
      this.productGateway.exportItems(this.productId, this.startDate, this.endDate).subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);

        var anchor = document.createElement("a");
        var body = document.getElementsByTagName('body')[0];
        anchor.download = this.currentCustomer.name + "-" + this.currentProduct.name + "-items-excel.xlsx";
        anchor.href = url;
        anchor.target = "_blank";
        body.appendChild(anchor);
        anchor.click();
        body.removeChild(anchor);
      });
    }

    form: FormGroup;    
    @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
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

      this.productGateway.importsItems(this.productId, formModel).subscribe(data=>{        
        console.log(data); 
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

    onExportPowerBI(){
      this.productGateway.exportToExcel(this.productId, this.startDate, this.endDate).subscribe(data=>{        
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);

        var anchor = document.createElement("a");
        var body = document.getElementsByTagName('body')[0];
        anchor.download = this.currentCustomer.name + "-" + this.currentProduct.name + "-excel.xlsx";
        anchor.href = url;
        anchor.target = "_blank";
        body.appendChild(anchor);
        anchor.click();
        body.removeChild(anchor);
      });
    }
  
   
   
}
