import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpClientFacadeService {
  private baseUrl = environment.baseURL; 
  
  constructor(private http: HttpClient, private Router: Router) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {params})
  }
  
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data)
  }

  put<T>(endpoint: string, id:string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data)
  }

  patch<T>(endpoint: string, id:string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}/${id}`, data)
  }

  delete<T>(endpoint: string, id:string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`)
  }
}
