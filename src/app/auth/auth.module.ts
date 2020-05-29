import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/sigup.component';
import { MaterialModule } from '../angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {

}
