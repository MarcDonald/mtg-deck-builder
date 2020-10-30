import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user';
import { ApiInteractorService } from './api-interactor.service';

interface RegisterDetails {
  username: string;
  givenName: string;
  familyName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiInteractor: ApiInteractorService) {}

  register(details: RegisterDetails): Observable<User> {
    return this.apiInteractor.post('users', details);
  }
}
