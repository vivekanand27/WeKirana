import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product/product.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  // products: Product[] = [];
  private productSubs: Subscription;
  displayedColumns: string[] = ['name', 'description', 'availableQuantity',  'price', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  userId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public productService: ProductsService,
              private authService: AuthService,
              private toastr: ToastrService) { }


  ngOnInit() {
    this.isLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts() .subscribe((products) => {
      this.userId = this.authService.getUserId();
      this.dataSource.data = products;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(productId) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
      this.toastr.success( 'Product deleted successfully'  , 'Success');
    });
  }

}
