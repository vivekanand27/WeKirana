import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

/* Angular material */
import { MaterialModule } from './angular-material.module';
import { MatSliderModule } from '@angular/material/slider';

import { NavMenuComponent} from './nav-menu/nav-menu.component';
import {RegisterShopComponent} from './register-shop/register-shop.component';
import {RegisterUserComponent} from './register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterShopComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
