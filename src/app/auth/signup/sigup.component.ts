import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 isLoading = false;

 constructor(public authService: AuthService,
             private toastr: ToastrService) {

 }

 onSignup(form: NgForm) {
   // console.log(form.value);
   if (form.invalid) {
     return;
   }
   const user: User = {
    email : form.value.email,
    password : form.value.password
   };

   this.authService.createUser(user)
   .subscribe( (response) => {
     // console.log(response);
     this.toastr.success('User created successfully.', 'Success');
   });
 }
}
