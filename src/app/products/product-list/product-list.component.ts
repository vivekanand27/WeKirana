import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product/product.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomExporter } from '../custom-exporter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // products: Product[] = [];
  private productSubs: Subscription;
  displayedColumns: string[] = ['name', 'description', 'availableQuantity',  'price', 'updatedOn', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  userId: string;
  customExporter: CustomExporter;

  @ViewChild('TABLE') table: ElementRef;
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
    this.customExporter = new CustomExporter(); // YOU CAN BENEFIT FROM DI TOO.
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.isLoading = false;
      this.userId = this.authService.getUserId();
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < products.length ; i++) {
        products[i].updatedOn = products[i].updatedOn.substring(0, products[i].updatedOn.indexOf('GMT') - 1) ;
      }
      this.dataSource.data = products;
    }, () => {
      this.isLoading = false;
      this.toastr.error( 'Some error occured while loading the products'  , 'Error');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(productId) {
    this.isLoading = true;
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
      this.toastr.success( 'Product deleted successfully'  , 'Success');
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    });
  }

  onComplete() {
    this.toastr.success( 'Product list downloaded'  , 'Success');
  }

}
