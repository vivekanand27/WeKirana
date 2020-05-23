import { Product } from '../models/product/product.model';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {

  }
  getProducts() {
    this.http
      .get<{ message: string, products: any }>('http://localhost:3000/api/products')
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
      .subscribe((data) => {
        console.log('from service');
        console.log(data);
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  addProduct(product: Product) {
    console.log(product);
    this.http.post<{ message: string }>('http://localhost:3000/api/products', product)
      .subscribe((responseData) => {
        debugger;
        console.log('responseData' + responseData);
      });
    // this.products.push(product);
    // this.productsUpdated.next([...this.products]);
    // console.log(this.products);
  }

}
