import { Product } from '../models/product/product.model';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
private productsUpdated = new Subject<Product[]>();

  getProducts() {
    return [...this.products];
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsUpdated.next([...this.products]);
    console.log(this.products);
  }

}
