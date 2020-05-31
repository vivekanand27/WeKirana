import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user/user.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
 isLoading = false;
 isShopOwner: boolean;
 private authStatusSub: Subscription;

 constructor(public authService: AuthService,
             private toastr: ToastrService) {

 }

 ngOnInit() {
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
     authStatus => {
       this.isLoading = false;
     }
   );
 }

 onSignup(form: NgForm) {
   if (!this.isValid(form)) {
     return;
   }
   this.isLoading = true;
   const user: User = {
    firstName : form.value.firstName,
    lastName : form.value.lastName,
    contactNumber: form.value.contactNumber,
    email : form.value.email,
    password : form.value.password,
    isShopOwner: form.value.isShopOwner,
    shopName: form.value.shopName,
    shopAddress: form.value.shopAddress
   };

   this.authService.createUser(user);
 }

  ngOnDestroy( ) {
      this.authStatusSub.unsubscribe();
  }

  isValid(form: NgForm) {
    let valid = true;
    let errorMessage = '';

    if (form.value.firstName === undefined || form.value.firstName === '') {
      errorMessage += 'Enter First Name.' + '<br>';
    }
    if (form.value.lastName === undefined || form.value.lastName === '') {
      errorMessage += 'Enter Last Name.' + '<br>';
    }
    if (form.value.email === undefined || form.value.email === '' || form.controls.email.status === 'INVALID') {
       errorMessage += 'Enter valid E-Mail.' + '<br>';
    }
    if (form.value.password === undefined || form.value.password === '') {
      errorMessage += 'Enter Password.' + '<br>';
    }
    if (form.value.confirmPassword === undefined || form.value.confirmPassword === '') {
      errorMessage += 'Enter Confirm Password.' + '<br>';
    }
    if (form.value.isShopOwner === undefined) {
       errorMessage += 'Please select if you are a shop owner?' + '<br>';
    }
    if (form.value.isShopOwner) {
      if (form.value.shopName === undefined || form.value.shopName === '') {
       errorMessage += 'Enter Shop Name.' + '<br>';
      }
      if (form.value.shopAddress === undefined || form.value.shopAddress === '') {
        errorMessage += 'Enter Shop Address.' + '<br>';
      }
    }
    if (form.value.password !== form.value.confirmPassword) {
      errorMessage += 'Password & Confirm Password do not match.' + '<br>';
    }
    if (errorMessage.length > 0) {
      valid = false;
      this.toastr.warning(errorMessage, 'Warning!', {enableHtml: true});
    }
    return valid;

  }

}
