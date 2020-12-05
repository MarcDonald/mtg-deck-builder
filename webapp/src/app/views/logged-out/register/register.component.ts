import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  confirmPasswordErrorMatcher = new MismatchingPasswordErrorStateMatcher();
  usernameTakenErrorMatcher = new UsernameTakenErrorStateMatcher();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        givenName: ['', Validators.required],
        familyName: ['', Validators.required],
      },
      { validators: [this.confirmPasswordValidator] }
    );
  }

  async register() {
    const {
      username,
      password,
      givenName,
      familyName,
    } = this.registerForm.value;
    this.userService
      .register({
        username: username,
        password: password,
        givenName: givenName,
        familyName: familyName,
      })
      .pipe(
        catchError((err, caught) => {
          if (err.error.message === 'User with that username already exists')
            this.registerForm.setErrors({ usernameTaken: true });
          return of(null);
        })
      )
      .subscribe((value) => {
        if (value) {
          this.login();
        }
      });
  }

  confirmPasswordValidator(group: FormGroup) {
    const { password, confirmPassword } = group.value;
    return password === confirmPassword ? null : { mismatchingPassword: true };
  }

  async login() {
    const { username, password } = this.registerForm.value;
    this.authService.login(username, password).subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/decks');
      }
    });
  }
}

class MismatchingPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isControlInvalid =
      control && control.invalid && control.touched && control.parent.touched;
    return isControlInvalid || form.hasError('mismatchingPassword');
  }
}

class UsernameTakenErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isControlInvalid =
      control && control.invalid && control.parent.touched;
    return isControlInvalid || form.hasError('usernameTaken');
  }
}
