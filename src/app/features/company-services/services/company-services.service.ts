import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { IResponse } from '../models/models/iresponse';
import { IUpdate } from '../models/models/iupdate';
import { Icreate } from '../models/models/icreate';

@Injectable({
  providedIn: 'root',
})
export class CompanyServicesService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly apiUrl = '/api/CompanyServices';

  constructor() {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken(); // Assume AuthService has a getToken() method
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  getAllServices(): Observable<IResponse<IUpdate[]>> {
    return this.http.get<IResponse<IUpdate[]>>(`${this.apiUrl}/getAll`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Get a Single Service by ID
  getServiceById(id: number): Observable<IResponse<IUpdate>> {
    return this.http.get<IResponse<IUpdate>>(
      `${this.apiUrl}/getById?id=${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  // ✅ Create a New Service
  createService(service: Icreate): Observable<IResponse<number>> {
    return this.http.post<IResponse<number>>(`${this.apiUrl}/create`, service, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Update an Existing Service
  updateService(companyServ: IUpdate): Observable<IResponse<IUpdate>> {
    return this.http.put<IResponse<IUpdate>>(
      `${this.apiUrl}/update`,
      companyServ,
      {
        headers: this.getHeaders(),
      }
    );
  }

  // ✅ Delete a Service
  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete?id=${id}`, {
      headers: this.getHeaders(),
    });
  }
  getServicesByCompanyId(companyId: number): Observable<IResponse<[]>> {
    return this.http.get<IResponse<[]>>(
      `${this.apiUrl}/getServicesByCompanyId?companyId=${companyId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
