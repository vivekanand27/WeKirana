import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterShopComponent} from './shop/register-shop/register-shop.component';
import { RegisterUserComponent} from './user/register-user/register-user.component';
import { LoginUserComponent} from './user/login-user/login-user.component';
import { ProductCreateComponent} from './products/product-create/product-create.component';
import { ProductListComponent} from './products/product-list/product-list.component';

const routes: Routes = [
  { path: 'register-shop', component: RegisterShopComponent },
  { path: 'app-register-user', component: RegisterUserComponent },
  { path: 'app-login-user', component: LoginUserComponent },
  { path: 'app-product-create', component: ProductCreateComponent },
  { path: 'edit-product/:productId', component: ProductCreateComponent },
  { path: 'app-product-list', component: ProductListComponent },
  { path: '', redirectTo: '/app-product-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
