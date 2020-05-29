import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
/* Angular material */
import { MaterialModule } from './angular-material.module';
import { MatSliderModule } from '@angular/material/slider';

import { NavMenuComponent} from './nav-menu/nav-menu.component';
import { RegisterShopComponent} from './shop/register-shop/register-shop.component';
import { RegisterUserComponent} from './user/register-user/register-user.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ProductModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterShopComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule,
    MaterialModule,
    ProductModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 5,
      autoDismiss: true,
      newestOnTop: true,
      countDuplicates: true,
      tapToDismiss: true
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
