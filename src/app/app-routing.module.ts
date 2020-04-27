import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterShopComponent} from './shop/register-shop/register-shop.component';
import { RegisterUserComponent} from './user/register-user/register-user.component';
import { LoginUserComponent} from './user/login-user/login-user.component';

const routes: Routes = [
  { path: 'app-register-shop', component: RegisterShopComponent },
  { path: 'app-register-user', component: RegisterUserComponent },
  { path: 'app-login-user', component: LoginUserComponent },
  { path: '', redirectTo: '/app-register-user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
