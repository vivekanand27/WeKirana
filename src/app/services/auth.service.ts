import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user/user.model';
import { AuthData } from '../models/user/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;

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

  createUser(user: User) {
    const authData: AuthData = {
      email: user.email,
      password: user.password
    };
    return this.http.post('http://localhost:3000/api/user/signup', authData);
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

  login(user: User) {
    const authData: AuthData = {
      email: user.email,
      password: user.password
    };
    return this.http
    .post<{token: string, expiresIn: number, userId: string}>
    ('http://localhost:3000/api/user/login', authData)
    .subscribe(res => {
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
        // this.toastr.success('Logged in successfully.', 'Success');
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/app-product-list']);
      }
     });
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
    this.router.navigate(['/app-login']);
    this.toastr.success('Logged out successfully.', 'Success');
  }

  private setAuthTimer(duration: number) {
    // console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
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
