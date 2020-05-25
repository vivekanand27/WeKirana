import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(public productService: ProductsService,
              private toastr: ToastrService,
              public route: ActivatedRoute
              ) {}
  products: Product[] = [];
  mode = 'create';
  productId: string;
  product: Product;
  saveBtnText: string;
  heading: string;
  isLoading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.saveBtnText = 'Update';
        this.heading = 'Update Product';
        this.productId = paramMap.get('productId');
        this.productService.getProduct(this.productId)
          .subscribe((product) => {
            this.isLoading = false;
            this.product = product;
          });
      } else {
        this.mode = 'create';
        this.saveBtnText = 'Create';
        this.heading = 'Create New Product';
        this.productId =  null;
      }
    });
  }

  onSaveProduct(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Please fill correct product details', 'Warning');
      return;
    }
    this.isLoading = true;
    const productForm: Product = {
      id: null,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      availableQuantity: form.value.availableQuantity
    };
    if (this.mode === 'create') {
      this.productService.addProduct(productForm);
      form.resetForm();
      this.toastr.success('Product added successfully!', 'Success');
      this.isLoading = false;
    } else {
      productForm.id = this.productId;
      this.productService.updateProduct(productForm)
          .subscribe( (response) => {
            this.toastr.success('Product updated successfully!', 'Success');
            this.isLoading = false;
          });
    }

  }
}
