import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';
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
    if (form.invalid) {
      return;
    }
    const user: User = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.login(user);

  }

  ngOnDestroy( ) {
    this.authStatusSub.unsubscribe();
  }


}
