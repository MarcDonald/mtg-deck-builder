import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiInteractorService {
  constructor(private http: HttpClient) {}

  baseApiRoute = 'http://localhost:5000/api/v1';

  get(route: string): Observable<any> {
    return this.http.get(`${this.baseApiRoute}/${route}`);
  }

  post(route: string, body: any | null = null): Observable<any> {
    return this.http.post(`${this.baseApiRoute}/${route}`, body);
  }

  delete(route: string): Observable<any> {
    return this.http.delete(`${this.baseApiRoute}/${route}`);
  }
}
