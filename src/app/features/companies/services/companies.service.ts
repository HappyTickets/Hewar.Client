import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../models/ICompany';
import { ICreateCompany } from '../models/ICreateCompany';
import { IApiResponse } from '../../../shared/models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private apiUrl = '/api/companies';
  constructor(private _httpClient:HttpClient) {}

  getAllCompanies():Observable<IApiResponse<ICompany[]>>{
    return this._httpClient.get<IApiResponse<ICompany[]>>(`${this.apiUrl}/getAll`)
  }
  getCompanyById(id:string):Observable<IApiResponse<ICompany>>{
    return this._httpClient.get<IApiResponse<ICompany>>(`${this.apiUrl}/getById?id=` + id)
  }
  createCompany(data:FormData):Observable<IApiResponse<ICreateCompany>>{
    return this._httpClient.post<IApiResponse<ICreateCompany>>(`${this.apiUrl}/create`, data)
  }
  updateCompany(data:FormData):Observable<IApiResponse<ICreateCompany>>{
    return this._httpClient.put<IApiResponse<ICreateCompany>>(`${this.apiUrl}/update`, data)
  }
  deleteCompany(id:number){
    return this._httpClient.delete(`${this.apiUrl}/softDelete?id=` + id)
  }
  uploadFile(file:FormData){
    return this._httpClient.post(`/files/upload`, file)
  }
}
