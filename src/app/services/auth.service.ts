import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user/user.model';
import { AuthData } from '../models/user/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  private userName: string;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) {

  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsers()  {
    return this.http
      .get<User[]>(BACKEND_URL + '/all-users');
    //   .pipe(map((userList) => {
    //     return userList.user.map(userDetail => {
    //       return {
    //         id: userDetail.id,
    //         createdOn: userDetail.createdOn,
    //         email: userDetail.email,
    //         firstName: userDetail.firstName,
    //         isShopOwner: userDetail.isShopOwner,
    //         lastName: userDetail.lastName,
    //         password: userDetail.password,
    //         updatedOn: userDetail.updatedOn,
    //       };
    //     });
    //   }))
    //  ;
  }

  getUser(id: string) {
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

  createUser(user: User) {
    // const authData: AuthData = {
    //   firsatName:
    //   email: user.email,
    //   password: user.password
    // };
    return this.http.post(BACKEND_URL + '/signup', user)
    .subscribe(() => {
      this.toastr.success('User created successfully.', 'Success');
      if (this.isAuthenticated) {
        this.router.navigate(['/app-user-list']);
      } else {
        this.router.navigate(['/auth/app-login']);
      }
    }, error => {
      // this.toastr.error('Some error occured.', 'Error');
      this.authStatusListener.next(false);
    });
  }

  deleteUser(userId: string) {
    debugger;
    return this.http.delete(BACKEND_URL + '/' + userId);
   }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  login(user: AuthData) {
    const authData: AuthData = {
      email: user.email,
      password: user.password
    };
    return this.http
    .post<{token: string, expiresIn: number, userId: string, userName: string}>
    (BACKEND_URL + '/login', authData)
    .subscribe(res => {
      console.log(res);
      const token = res.token;
      this.token = token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.userId = res.userId;
        this.userName = res.userName;
        // this.toastr.success('Logged in successfully.', 'Success');
        this.saveAuthData(token, expirationDate, this.userId, this.userName);
        this.router.navigate(['/app-product-list']);
      }
     }, error => {
      this.authStatusListener.next(false);
    }
     );
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    this.token = null,
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/auth/app-login']);
    this.toastr.success('Logged out successfully.', 'Success');
  }

  private setAuthTimer(duration: number) {
    // console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }

    return {
      token,
      userId,
      expirationDate: new Date(expirationDate)
    };
  }


}
