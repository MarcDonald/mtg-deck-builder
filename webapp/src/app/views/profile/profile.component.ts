import { Component, OnInit } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureDialog } from '../dialogs/are-you-sure-dialog/are-you-sure.dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUserDetails()
      .pipe(
        catchError((err, caught) => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe((user) => {
        this.user = user;
        this.profileForm.controls.givenName.setValue(user.givenName);
        this.profileForm.controls.familyName.setValue(user.familyName);
      });

    this.profileForm = this.formBuilder.group({
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
    });
  }

  save() {
    const { givenName, familyName } = this.profileForm.value;
    let givenNameToUpdateTo = this.user.givenName;
    if (givenName) {
      givenNameToUpdateTo = givenName;
    }
    let familyNameToUpdateTo = this.user.familyName;
    if (familyName) {
      familyNameToUpdateTo = familyName;
    }
    this.userService
      .updateUser(givenNameToUpdateTo, familyNameToUpdateTo)
      .pipe(
        catchError((err, caught) => {
          console.error(err);
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
    const dialogRef = this.dialog.open(AreYouSureDialog, {
      data: {
        content: 'Are you sure you want to delete your account?',
      },
    });
    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.userService
          .deleteUser()
          .pipe(
            catchError((err, caught) => {
              console.error(err);
              return of(null);
            })
          )
          .subscribe((_) => {
            this.authService.logout().subscribe((_) => {
              this.router.navigateByUrl('/').then();
            });
          });
      }
    });
  }
}
