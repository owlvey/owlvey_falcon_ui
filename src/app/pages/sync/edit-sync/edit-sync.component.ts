import { Component, OnInit, ViewChildren } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsGateway } from '../../../@core/data/products.gateway';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerBaseComponent } from '../../common/components/base-customer.component';
import { CustomersGateway } from '../../../@core/data/customers.gateway';
import { ProductBaseComponent } from '../../common/components/base-product.components';

@Component({
  selector: 'app-edit-sync',
  templateUrl: './edit-sync.component.html',
  styleUrls: ['./edit-sync.component.scss']
})
export class EditSyncComponent extends ProductBaseComponent {

  isLoading: boolean = false;  
  actionConfirmWord: string;
  name: string;  
  
  editForm: FormGroup;
  formTitle: string;

  constructor(
    protected location: Location,
    protected customerGateway: CustomersGateway,        
    private productsGateway: ProductsGateway,
    private fb: FormBuilder,
    protected theme: NbThemeService,
    private toastr: NbToastrService,
    private datePipe: DatePipe,
    protected router: Router,     
    protected activatedRoute: ActivatedRoute) {       
      super(location, customerGateway, productsGateway, theme, router, activatedRoute);
      this.editForm = this.fb.group({        
        target: ['', Validators.required]
      });
      this.isLoading = false;
  }      

  onChangeQueryParameters(paramMap: ParamMap): void {
    this.name = paramMap.get('name');
    super.onChangeQueryParameters(paramMap);    
    this.loadSync(); 
  }

  public loadSync(){
    this.productGateway.getSync(this.productId, this.name).subscribe(data=>{      
      const target = this.datePipe.transform(new Date(data.target), 'yyyy-MM-dd hh:mm:ss')       
      this.editForm.get("target").setValue(target);      
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {    
    if (!this.editForm.valid) {
      this.toastr.warning("Please check the form fields are filled correctly.", "Warning")
      return;
    }    
    this.isLoading = true;
    const payload : any =  { target : new Date(this.editForm.value.target)  };
    let  defer = this.productsGateway.putSync(this.productId, this.name, payload);
    defer.subscribe((data) => {
        this.toastr.success("Synchronization updated");
        this.isLoading = false;        
        this.location.back();
      }, (error) => {
        this.isLoading = false;
        this.toastr.warning("Something went wrong, please try again.", "Warning")
      });
  }
}
