import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(public productService: ProductsService) {}
  products: Product[] = [];

  ngOnInit(): void {}

  onCreateProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const product: Product = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      availableQuantity: form.value.availableQuantity,
    };

    this.productService.addProduct(product);
    form.resetForm();
  }
}
