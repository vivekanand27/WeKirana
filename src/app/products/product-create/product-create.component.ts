import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(public productService: ProductsService,
              private toastr: ToastrService) {}
  products: Product[] = [];

  ngOnInit(): void {}

  onCreateProduct(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Please fill correct product details', 'Warning');
      return;
    }
    const product: Product = {
      id: null,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      availableQuantity: form.value.availableQuantity
    };

    this.productService.addProduct(product);
    form.resetForm();
    this.toastr.success('Product added successfully!', 'Success');
  }
}
