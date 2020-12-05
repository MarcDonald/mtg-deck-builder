import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm.valueChanges.subscribe(() => (this.error = null));
  }

  async login() {
    const { username, password } = this.loginForm.value;
    this.authService
      .login(username, password)
      .pipe(
        catchError((err, _) => {
          this.loginForm.controls.password.setValue('');
          this.error = err.error.message;
          return of(false);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('/decks');
        }
      });
  }
}
