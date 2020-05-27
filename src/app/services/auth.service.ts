import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/user/user.model';
import { AuthData } from '../models/user/auth-data.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {

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
    return this.http.post('http://localhost:3000/api/user/login', authData);
  }

}
