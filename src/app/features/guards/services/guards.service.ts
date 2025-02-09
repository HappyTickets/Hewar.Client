import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {
  baseUrl = environment.baseURL
  baseEndPoint = 'api/guards'
  constructor(private _httpClient:HttpClient) { }
  getAllGuards(){
    return this._httpClient.get(`${this.baseEndPoint}/getAll`)
  }
  getGuardsById(id:any){
    return this._httpClient.get(`${this.baseUrl}${this.baseEndPoint}/getById`, id)
  }
  createGuards(data:any){
    return this._httpClient.post(`${this.baseUrl}${this.baseEndPoint}/create`, data)
  }
  updateGuards(data:any){
    return this._httpClient.post(`${this.baseUrl}${this.baseEndPoint}/update`, data)
  }
  deleteGuards(id:any){
    return this._httpClient.post(`${this.baseUrl}${this.baseEndPoint}/softDelete`, id)
  }
}

