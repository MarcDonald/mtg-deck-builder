import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiInteractorService {
  constructor(private http: HttpClient) {}

  baseApiRoute = 'http://localhost:5000/api/v1';

  get accessToken(): string {
    return localStorage.getItem('accessToken');
  }

  get(route: string, withAuth: boolean = false): Observable<any> {
    let options = {};
    if (withAuth) {
      options = {
        headers: {
          Authorization: this.accessToken,
        },
      };
    }
    return this.http.get(`${this.baseApiRoute}/${route}`, options);
  }

  post(
    route: string,
    body: any | null = null,
    withAuth: boolean = false
  ): Observable<any> {
    let options = {};
    if (withAuth) {
      options = {
        headers: {
          Authorization: this.accessToken,
        },
      };
    }
    return this.http.post(`${this.baseApiRoute}/${route}`, body, options);
  }

  put(
    route: string,
    body: any | null = null,
    withAuth: boolean = false
  ): Observable<any> {
    let options = {};
    if (withAuth) {
      options = {
        headers: {
          Authorization: this.accessToken,
        },
      };
    }
    return this.http.put(`${this.baseApiRoute}/${route}`, body, options);
  }

  delete(route: string, withAuth: boolean = false): Observable<any> {
    let options = {};
    if (withAuth) {
      options = {
        headers: {
          Authorization: this.accessToken,
        },
      };
    }

    return this.http.delete(`${this.baseApiRoute}/${route}`, options);
  }
}
