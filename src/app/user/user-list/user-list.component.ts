import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email',  'contactNumber', 'updatedOn', 'actions'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  userId: string;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private authService: AuthService,
              private toastr: ToastrService) { }


  ngOnInit() {
    this.isLoading = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsers().subscribe((users) => {
      console.log(users);
      this.isLoading = false;
      this.userId = this.authService.getUserId();
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < users.length ; i++) {
        users[i].updatedOn = users[i].updatedOn.substring(0, users[i].updatedOn.indexOf('GMT') - 1) ;
      }
      this.dataSource.data = users;
    }, () => {
      this.isLoading = false;
      this.toastr.error( 'Some error occured while loading the users detail'  , 'Error');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(productId) {
    // this.isLoading = true;
    // this.productService.deleteProduct(productId).subscribe(() => {
    //   this.loadProducts();
    //   this.toastr.success( 'Product deleted successfully'  , 'Success');
    //   this.isLoading = false;
    // },
    // () => {
    //   this.isLoading = false;
    // });
  }

}
