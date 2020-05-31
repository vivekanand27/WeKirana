import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthData } from 'src/app/models/user/auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  onLogin(form: NgForm) {
    this.isLoading = true;
    if (!this.isValid(form)) {
      return;
    }
    const user: AuthData = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.login(user);

  }

  ngOnDestroy( ) {
    this.authStatusSub.unsubscribe();
  }

  isValid(form: NgForm) {
    let valid = true;
    let errorMessage = '';

    if (form.value.email === undefined || form.value.email === '' || form.controls.email.status === 'INVALID') {
       errorMessage += 'Please enter a valid Email.' + '<br>';
    }
    if (form.value.password === undefined || form.value.password === '') {
      errorMessage += 'Please enter a valid Password.' + '<br>';
    }
    if (errorMessage.length > 0 && form.invalid) {
      valid = false;
      this.toastr.warning(errorMessage, 'Warning!', {enableHtml: true});
    }
    this.isLoading = false;
    return valid;
  }


}
