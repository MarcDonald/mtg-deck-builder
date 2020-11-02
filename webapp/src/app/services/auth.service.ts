import { Injectable } from '@angular/core';
import { ApiInteractorService } from './api-interactor.service';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private apiInteractor: ApiInteractorService) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.isLoggedIn = true;
      this.tokenLogin().subscribe();
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
      }),
      catchError((err, _) => {
        console.error(`Error occurred trying to logout - ${err.error.message}`);
        return of(false);
      })
    );
  }
}
