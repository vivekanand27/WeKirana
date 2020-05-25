import { Product } from '../models/product/product.model';
import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {

  }
  getProducts()  {
    return this.http
      .get<{ products: any }>('http://localhost:3000/api/products')
      .pipe(map((productData) => {
        return productData.products.map(product => {
          return {
            name: product.name,
            availableQuantity: product.availableQuantity,
            description: product.description,
            price: product.price,
            id: product._id
          };
        });
      }))
     ;
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(productId: string) {
    return this.http
    .get<Product>('http://localhost:3000/api/products/' + productId);
  }

  updateProduct(product: Product) {
    const prod: Product = {
      id : product.id,
      name: product.name,
      description: product.description,
      availableQuantity: product.availableQuantity,
      price: product.price
    };
    return this.http.put('http://localhost:3000/api/products/' + product.id, prod);
  }

  addProduct(product: Product) {
   return this.http
        .post<{ message: string, productId: string }>('http://localhost:3000/api/products', product)
        .subscribe((responseData) => {
          product.id = responseData.productId;
          console.log('responseData' + responseData.productId);
          this.router.navigate(['/']);
        });
  }

  deleteProduct(productId: string) {
   return this.http.delete('http://localhost:3000/api/products/' + productId);
  }

}
