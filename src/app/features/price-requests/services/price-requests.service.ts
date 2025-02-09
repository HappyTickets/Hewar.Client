import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreatePriceReq } from '../models/ICreatePriceReq';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { Observable } from 'rxjs';
import { IFacilityPriceRequest } from '../models/ifacility-price-request';
import { ICompanyPriceRequest } from '../models/icompany-price-request';
import { IPriceRequest } from '../models/iprice-request';

@Injectable({
  providedIn: 'root'
})
export class PriceRequestsService {
  private http = inject(HttpClient)
  baseEndPoint = '/api/PriceRequests/'

  create(data: ICreatePriceReq): Observable <IApiResponse<number>> {
    return this.http.post<IApiResponse<number>>(`${this.baseEndPoint}create`, data);
  }
  update(data: ICreatePriceReq): Observable <IApiResponse<number>> {
    return this.http.put<IApiResponse<number>>(`${this.baseEndPoint}update`, data);
  }
  getById(priceRequestId: number): Observable <IApiResponse<IPriceRequest>> {
    return this.http.get<IApiResponse<IPriceRequest>>(`${this.baseEndPoint}getById`, {params: { priceRequestId }});
  }
  cancel(priceRequestId: number):Observable<IApiResponse<unknown>> {
    return this.http.patch<IApiResponse<unknown>>(`${this.baseEndPoint}cancel`,{},{params: { priceRequestId }});
  }
  hide(priceRequestId: number):Observable<IApiResponse<unknown>> {
    return this.http.patch<IApiResponse<unknown>>(`${this.baseEndPoint}hide`,{},{params: { priceRequestId }});
  }
  show(priceRequestId: number):Observable<IApiResponse<unknown>> {
    return this.http.patch<IApiResponse<unknown>>(`${this.baseEndPoint}show`,{},{params: { priceRequestId }});
  }
  getMyFacilityRequests() : Observable <IApiResponse<IFacilityPriceRequest[]>> {
    return this.http.get<IApiResponse<IFacilityPriceRequest[]>>(`${this.baseEndPoint}getMyFacilityRequests`);
  }
  getMyCompanyRequests(): Observable <IApiResponse<ICompanyPriceRequest[]>> {
    return this.http.get<IApiResponse<ICompanyPriceRequest[]>>(`${this.baseEndPoint}getMyCompanyRequests`);
  }
}
