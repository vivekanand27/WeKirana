import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterShopComponent} from './shop/register-shop/register-shop.component';
import { RegisterUserComponent} from './user/register-user/register-user.component';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent} from './auth/signup/sigup.component';
import { ProductCreateComponent} from './products/product-create/product-create.component';
import { ProductListComponent} from './products/product-list/product-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'register-shop', component: RegisterShopComponent },
  { path: 'app-register-user', component: RegisterUserComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-signup', component: SignupComponent },
  { path: 'app-product-create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:productId', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'app-product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/app-login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
