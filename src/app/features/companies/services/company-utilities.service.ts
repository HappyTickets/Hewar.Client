import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { Observable } from 'rxjs';
import { ICompanyService } from '../models/i-company-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyUtilitiesService {
  private apiUrl = '/api/CompanyServices/';
  http = inject(HttpClient);
  createCompanyService(data: ICompanyService):Observable<IApiResponse<number>>{
    return this.http.post<IApiResponse<number>>(`${this.apiUrl}create`, data)
  }
  updateCompanyService(data: ICompanyService):Observable<IApiResponse<null>>{
    return this.http.put<IApiResponse<null>>(`${this.apiUrl}update`, data)
  }
  getCompanyServiceById(id: number):Observable<IApiResponse<ICompanyService>>{
    return this.http.get<IApiResponse<ICompanyService>>(`${this.apiUrl}getById`,{params: { id }});
  }
  getServicesByCompanyId(companyId: number):Observable <IApiResponse<ICompanyService[]>> {
    return this.http.get<IApiResponse<ICompanyService[]>>(`${this.apiUrl}getServicesByCompanyId`,{params: { companyId }})
  }
  getAllServices():Observable <IApiResponse<ICompanyService[]>> {
    return this.http.get<IApiResponse<ICompanyService[]>>(`${this.apiUrl}getAll`)
  }
  deleteCompany(id: number):Observable <IApiResponse<null>>{
    return this.http.delete<IApiResponse<null>>(`${this.apiUrl}Delete/${id}`)
  }
}
