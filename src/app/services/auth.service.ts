import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user/user.model';
import { AuthData } from '../models/user/auth-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {

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

  login(user: User) {
    const authData: AuthData = {
      email: user.email,
      password: user.password
    };
    return this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
    .subscribe(res => {
      console.log(res);
      const token = res.token;
      this.token = token;
      this.authStatusListener.next(true);
     });
  }



}
