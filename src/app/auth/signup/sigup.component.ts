import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user/user.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
 isLoading = false;
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
   // console.log(form.value);
   if (form.invalid) {
     return;
   }
   this.isLoading = true;
   const user: User = {
    email : form.value.email,
    password : form.value.password
   };

   this.authService.createUser(user);
 }

  ngOnDestroy( ) {
      this.authStatusSub.unsubscribe();
  }

}
