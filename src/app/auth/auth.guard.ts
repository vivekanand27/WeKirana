import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
             ): boolean | Observable<boolean> | Promise<boolean> {
               const isAuth = this.authService.getIsAuth();
               if (!isAuth) {
                this.router.navigate(['/auth/app-login']);
               }
               return isAuth;
              }

}
