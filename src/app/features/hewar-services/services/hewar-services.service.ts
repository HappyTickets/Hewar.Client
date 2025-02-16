import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icreate } from '../models/icreate';
import { Observable } from 'rxjs';
import { IResponse } from '../models/iresponse';
import { IUpdate } from '../models/iupdate';

@Injectable({
  providedIn: 'root',
})
export class HewarServicesService {
  private readonly apiUrl = '/api/HewarServices';

  constructor(private _httpClient: HttpClient) {}
  CreateService(HewarService: Icreate): Observable<IResponse<number>> {
    return this._httpClient.post<IResponse<number>>(
      `${this.apiUrl}/create`,
      HewarService
    );
  }
  // Get All Services
  getAllServices(): Observable<IResponse<IUpdate[]>> {
    return this._httpClient.get<IResponse<IUpdate[]>>(`${this.apiUrl}/getAll`);
  }
  // Get Service By Id
  getServiceById(id: number): Observable<IResponse<IUpdate>> {
    return this._httpClient.get<IResponse<IUpdate>>(
      `${this.apiUrl}/getById?id=${id}`
    );
  }
  // Update Service
  updateService(HewarService: IUpdate): Observable<IResponse<IUpdate>> {
    return this._httpClient.put<IResponse<IUpdate>>(
      `${this.apiUrl}/update`,
      HewarService
    );
  }
  // Delete Service
  deleteService(id: number): Observable<IResponse<null>> {
    return this._httpClient.delete<IResponse<null>>(
      `${this.apiUrl}/delete?id=${id}`
    );
  }
}
