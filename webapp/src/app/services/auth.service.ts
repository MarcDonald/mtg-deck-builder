import { Injectable } from '@angular/core';
import { ApiInteractorService } from './api-interactor.service';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import User from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private apiInteractor: ApiInteractorService, router: Router) {
    const accessToken = localStorage.getItem('accessToken');
    // Validates the access token and redirects you to the logged out page if the token isn't valid
    if (accessToken) {
      this.isLoggedIn = true;
      this.tokenLogin()
        .pipe(
          catchError((err, _) => {
            router.navigateByUrl('/').then();
            throw err;
          })
        )
        .subscribe();
    }
  }

  tokenLogin(): Observable<User> {
    return this.apiInteractor.post('login/token', null, true).pipe(
      tap((user) => {
        this.isLoggedIn = true;
      }),
      shareReplay(),
      catchError((err, _) => {
        console.error(`Error trying to login - ${err.error.message}`);
        this.isLoggedIn = false;
        localStorage.clear();
        throw err;
      })
    );
  }

  login(username: string, password: string): Observable<User> {
    return this.apiInteractor.post('login', { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.token);
        this.isLoggedIn = true;
      }),
      shareReplay(),
      catchError((err, _) => {
        console.error(`Error trying to login - ${err.error.message}`);
        this.isLoggedIn = false;
        throw err;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.apiInteractor.post('logout', null, true).pipe(
      tap((value) => {
        localStorage.clear();
        this.isLoggedIn = false;
      })
    );
  }
}
