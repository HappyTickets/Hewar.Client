import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientFacadeService {
  private baseUrl = environment.baseURL; 
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  get<T>(endpoint: string, useAuth:boolean = true): Observable<T> {
    const headers = useAuth ? this.setAuthHeader() : undefined;
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers })
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  post<T>(endpoint: string, data: any, useAuth:boolean = true): Observable<T> {
    const headers = useAuth ? this.setAuthHeader() : undefined;
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  put<T>(endpoint: string, data: any, useAuth:boolean = true): Observable<T> {
    const headers = useAuth ? this.setAuthHeader() : undefined;
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  patch<T>(endpoint: string, data: any, useAuth:boolean = true): Observable<T> {
    const headers = useAuth ? this.setAuthHeader() : undefined;
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  delete<T>(endpoint: string, useAuth:boolean = true): Observable<T> {
    const headers = useAuth ? this.setAuthHeader() : undefined;
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers })
    .pipe(
      catchError((err) => this.handleError(err))
    );
  }

  private setAuthHeader(): HttpHeaders {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken');
      // if (!this.authToken) {
        // this.router.navigate(['/login']);
        // throw new Error('Unauthorized');
      // }
    }
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    // if (error.status === 401 || error.status === 403) {
    //   this.router.navigate(['/login']);
    // }
    // throw error;
    return throwError(() => new Error(error.message || 'An error occurred'));
  }
}
