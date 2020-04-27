import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterShopComponent} from './register-shop/register-shop.component';
import { RegisterUserComponent} from './register-user/register-user.component';

const routes: Routes = [
  { path: 'app-register-shop', component: RegisterShopComponent },
  { path: 'app-register-user', component: RegisterUserComponent },
  { path: '', redirectTo: '/app-register-user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
