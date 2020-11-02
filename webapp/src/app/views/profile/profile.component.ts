import { Component, OnInit } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = null;
  error: string | null = null;
  familyName = new FormControl('');
  givenName = new FormControl('');

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUserDetails()
      .pipe(catchError((err, caught) => of(null)))
      .subscribe((user) => (this.user = user));
  }

  save() {
    let givenNameToUpdateTo = this.user.givenName;
    if (this.givenName.value) {
      givenNameToUpdateTo = this.givenName.value;
    }
    let familyNameToUpdateTo = this.user.familyName;
    if (this.familyName.value) {
      familyNameToUpdateTo = this.familyName.value;
    }
    this.userService
      .updateUser(givenNameToUpdateTo, familyNameToUpdateTo)
      .pipe(
        catchError((err, caught) => {
          this.error = err.message;
          return of(null);
        })
      )
      .subscribe((value) => {
        if (value) {
          this.router.navigateByUrl('/decks').then();
        }
      });
  }

  delete() {
    this.userService
      .deleteUser()
      .pipe(
        catchError((err, caught) => {
          this.error = err.message;
          return of(null);
        })
      )
      .subscribe((_) => {
        this.authService.logout().subscribe((_) => {
          this.router.navigateByUrl('/').then();
        });
      });
  }
}
