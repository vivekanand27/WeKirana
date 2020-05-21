import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
/* Angular material */
import { MaterialModule } from './angular-material.module';
import { MatSliderModule } from '@angular/material/slider';

import { NavMenuComponent} from './nav-menu/nav-menu.component';
import {RegisterShopComponent} from './shop/register-shop/register-shop.component';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {LoginUserComponent} from './user/login-user/login-user.component';
import {ProductCreateComponent} from './products/product-create/product-create.component';
import {ProductListComponent} from './products/product-list/product-list.component';

import { ProductsService } from './services/products.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterShopComponent,
    RegisterUserComponent,
    LoginUserComponent,
    ProductCreateComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
