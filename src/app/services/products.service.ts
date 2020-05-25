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
            id: product._id,
            imagePath: product.imagePath
          };
        });
      }))
     ;
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http
    .get<{_id: string, name: string, description: string,
        availableQuantity: number, price: number, imagePath: string }>
    ('http://localhost:3000/api/products/' + id);
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

  addProduct(product: Product, image: string) {
    const postData = new FormData();
    postData.append('name', product.name);
    postData.append('description', product.description);
    postData.append('availableQuantity', String(product.availableQuantity));
    postData.append('price', String(product.price));
    postData.append('image', image, product.name);

    return this.http
      .post<{ message: string, product: Product }>
      ('http://localhost:3000/api/products', postData);
  }

  deleteProduct(productId: string) {
   return this.http.delete('http://localhost:3000/api/products/' + productId);
  }

}
