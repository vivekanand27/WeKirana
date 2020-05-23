import { Product } from '../models/product/product.model';
import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {

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

  addProduct(product: Product) {
    this.http.post<{ message: string }>('http://localhost:3000/api/products', product)
      .subscribe((responseData) => {
        console.log('responseData' + responseData);
      });
  }

}
