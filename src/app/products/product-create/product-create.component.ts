import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(public productService: ProductsService,
              private toastr: ToastrService,
              public route: ActivatedRoute,
              private router: Router
  ) { }
  products: Product[] = [];
  mode = 'create';
  productId: string;
  product: Product;
  saveBtnText: string;
  heading: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      // id: new FormControl(null, {}),
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      availableQuantity: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.saveBtnText = 'Update';
        this.heading = 'Update Product';
        this.productId = paramMap.get('productId');
        this.productService.getProduct(this.productId)
          .subscribe((prodData) => {
            this.isLoading = false;
            this.product = {
              id: prodData._id,
              name: prodData.name,
              description: prodData.description,
              availableQuantity: prodData.availableQuantity,
              price: prodData.price,
              imagePath: prodData.imagePath
            };
            this.form.setValue({
              name : this.product.name,
              description: this.product.description,
              availableQuantity: this.product.availableQuantity,
              price: this.product.price,
              image: this.product.imagePath,
            });
            console.log(this.form);
            this.imagePreview = this.form.value.image;
          });
      } else {
        this.mode = 'create';
        this.saveBtnText = 'Create';
        this.heading = 'Create New Product';
        this.productId = null;
      }
    });
  }

  onSaveProduct() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill correct product details', 'Warning');
      return;
    }
    this.isLoading = true;
    const productForm: Product = {
      id: null,
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      availableQuantity: this.form.value.availableQuantity
    };
    const image = this.form.value.image;
    if (this.mode === 'create') {
      this.productService.addProduct(productForm, image)
      .subscribe((responseData) => {
        // product.id = responseData.productId;
        this.form.reset();
        this.toastr.success('Product added successfully!', 'Success');
        this.isLoading = false;
        this.router.navigate(['/']);
      });

    } else {
      productForm.id = this.productId;
      this.productService.updateProduct(productForm)
        .subscribe((response) => {
          this.toastr.success('Product updated successfully.', 'Success');
          this.isLoading = false;
          this.router.navigate(['/']);
        });
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
