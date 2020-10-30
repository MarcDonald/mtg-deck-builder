import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username.valueChanges.subscribe(() => (this.error = null));
    this.password.valueChanges.subscribe(() => (this.error = null));
  }

  async login() {
    this.authService
      .login(this.username.value, this.password.value)
      .pipe(
        catchError((err, _) => {
          this.password.setValue('');
          this.error = err.error.message;
          return of(false);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/home');
        }
      });
  }
}
