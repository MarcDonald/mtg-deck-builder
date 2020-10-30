import { Injectable } from '@angular/core';
import { ApiInteractorService } from './api-interactor.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import User from '../models/user';

// TODO proper auth
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user: Observable<User | null> = this.userSubject.asObservable();
  isLoggedIn: boolean = false;

  constructor(private apiInteractor: ApiInteractorService) {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.isLoggedIn = true;
      this.login(storedUser, 'password').subscribe();
    }
  }

  login(username: string, password: string): Observable<User> {
    return this.apiInteractor.post('login', { username, password }).pipe(
      tap((user) => {
        this.userSubject.next(user);
        localStorage.setItem('username', username);
        this.isLoggedIn = true;
      }),
      shareReplay(),
      catchError((err, _) => {
        console.error(`Error trying to login - ${err.error.message}`);
        throw err;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.apiInteractor.post('logout').pipe(
      tap((value) => {
        this.userSubject.next(null);
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
