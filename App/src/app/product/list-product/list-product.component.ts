import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { EventHandlerService } from 'src/app/event-handler.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  providers: [ProductService]
})
export class ListProductComponent implements OnInit {

  isLoading: boolean = false;
  products: any[];
  actionConfirmWord: string;

  constructor(
    private eventHandler: EventHandlerService,
    private toastr: ToastrService,
    private productService: ProductService
  ) {

  }

  getProducts(){
    this.isLoading = true;
    this.productService.getProducts(1).subscribe(
      (data:any[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  ngOnInit() {
    this.getProducts();
  }

}
