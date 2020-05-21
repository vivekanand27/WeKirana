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
  constructor(public productService: ProductsService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
    console.log(this.productService.getProducts());
  }

}
