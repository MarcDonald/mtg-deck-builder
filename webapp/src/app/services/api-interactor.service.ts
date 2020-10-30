import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiInteractorService {
  constructor(private http: HttpClient) {}

  get(route: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/v1/${route}`);
  }

  post(route: string, body: any | null = null): Observable<any> {
    return this.http.post(`http://localhost:5000/api/v1/${route}`, body);
  }
}
