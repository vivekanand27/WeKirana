import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/sigup.component';


const routes: Routes = [
  { path: 'app-login', component: LoginComponent },
  { path: 'app-signup', component: SignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class AuthRoutingModule{

}
