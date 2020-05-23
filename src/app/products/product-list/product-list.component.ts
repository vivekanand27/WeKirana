import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product/product.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productSubs: Subscription;
  displayedColumns: string[] = ['name', 'description', 'availableQuantity',  'price'];
  dataSource: any;

  constructor(public productService: ProductsService) { }


  ngOnInit() {

    const data = this.productService.getProducts() .subscribe((products) => {
      this.dataSource = products;
    });
  }

}
