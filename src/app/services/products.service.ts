import { Product } from '../models/product/product.model';
import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/products';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {

  }
  getProducts()  {
    return this.http
      .get<{ products: any }>(BACKEND_URL)
      .pipe(map((productData) => {
        return productData.products.map(product => {
          return {
            name: product.name,
            availableQuantity: product.availableQuantity,
            description: product.description,
            price: product.price,
            id: product._id,
            imagePath: product.imagePath,
            createdBy: product.createdBy,
            createdOn: product.createdOn,
            updatedBy: product.updatedBy,
            updatedOn: product.updatedOn,
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
    .get<{_id: string,
          name: string,
          description: string,
          availableQuantity: number,
          price: number,
          imagePath: string,
          createdBy: string }>
    (BACKEND_URL + '/' + id);
  }

  updateProduct(product: Product, image: File | string) {
    let productData: Product | FormData;
    if (typeof(image) === 'object') {
      productData = new FormData();
      productData.append('id', product.id);
      productData.append('name', product.name);
      productData.append('description', product.description);
      productData.append('availableQuantity', String(product.availableQuantity));
      productData.append('price', String(product.price));
      productData.append('image', image, product.name);
    } else {
      productData = {
        id: product.id,
        name : product.name,
        description: product.description,
        price: product.price,
        availableQuantity: product.availableQuantity,
        imagePath: product.imagePath,
        createdBy: null
      };
    }

    // const prod: Product = {
    //   id : product.id,
    //   name: product.name,
    //   description: product.description,
    //   availableQuantity: product.availableQuantity,
    //   price: product.price
    // };
    // console.log(productData);
    return this.http
    .put(BACKEND_URL + '/' + product.id, productData);
  }

  addProduct(product: Product, image: string) {
    const productData = new FormData();
    productData.append('name', product.name);
    productData.append('description', product.description);
    productData.append('availableQuantity', String(product.availableQuantity));
    productData.append('price', String(product.price));
    productData.append('image', image, product.name);

    return this.http
      .post<{ message: string, product: Product }>
      (BACKEND_URL , productData);
  }

  deleteProduct(productId: string) {
   return this.http.delete(BACKEND_URL + '/' + productId);
  }

}
