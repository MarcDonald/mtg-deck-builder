import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  givenName = new FormControl('');
  familyName = new FormControl('');
  error: null | string = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username.valueChanges.subscribe(() => (this.error = null));
    this.password.valueChanges.subscribe(() => (this.error = null));
    this.givenName.valueChanges.subscribe(() => (this.error = null));
    this.familyName.valueChanges.subscribe(() => (this.error = null));
  }

  async register() {
    this.userService
      .register({
        username: this.username.value,
        password: this.password.value,
        givenName: this.givenName.value,
        familyName: this.familyName.value,
      })
      .pipe(
        catchError((err, caught) => {
          this.error = err.error.message;
          return of(null);
        })
      )
      .subscribe((value) => {
        if (value) {
          this.login();
        }
      });
  }

  async login() {
    this.authService
      .login(this.username.value, this.password.value)
      .subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/home');
        }
      });
  }
}
