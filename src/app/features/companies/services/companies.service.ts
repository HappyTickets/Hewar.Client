import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../../core/models/IResponse';
import { ICompany } from '../models/ICompany';
import { ICreateCompany } from '../models/ICreateCompany';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private apiUrl = '/api/companies';
  constructor(private _httpClient:HttpClient) {}

  getAllCompanies():Observable<IResponse<ICompany[]>>{
    return this._httpClient.get<IResponse<ICompany[]>>(`${this.apiUrl}/getAll`)
  }
  getCompanyById(id:string):Observable<IResponse<ICompany>>{
    return this._httpClient.get<IResponse<ICompany>>(`${this.apiUrl}/getById?id=` + id)
  }
  createCompany(data:FormData):Observable<IResponse<ICreateCompany>>{
    return this._httpClient.post<IResponse<ICreateCompany>>(`${this.apiUrl}/create`, data)
  }
  updateCompany(data:FormData):Observable<IResponse<ICreateCompany>>{
    return this._httpClient.put<IResponse<ICreateCompany>>(`${this.apiUrl}/update`, data)
  }
  deleteCompany(id:number){
    return this._httpClient.delete(`${this.apiUrl}/softDelete?id=` + id)
  }
  uploadFile(file:FormData){
    return this._httpClient.post(`/files/upload`, file)
  }
}
