import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 isLoading = false;


 constructor(public authService: AuthService,
             private toastr: ToastrService) {}

 onLogin(form: NgForm) {
   console.log(form.value);
   if (form.invalid) {
     return;
   }
   const user: User = {
    email : form.value.email,
    password : form.value.password
   };
   this.authService.login(user);
 }


}
