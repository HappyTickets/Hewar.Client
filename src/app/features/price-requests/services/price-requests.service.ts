import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreatePriceReq } from '../models/ICreatePriceReq';
import { IResponse } from '../../../core/models/IResponse';
import { IFacilityRequest } from '../models/IFacilityRequest';
import { ICompanyRequest } from '../models/ICompanyRequest';

@Injectable({
  providedIn: 'root'
})
export class PriceRequestsService {
  private http = inject(HttpClient)
  baseEndPoint = '/api/priceRequests/'

  createPriceRequest(data: ICreatePriceReq) {
    return this.http.post<IResponse<number>>(`${this.baseEndPoint}createRequest`, data);
  }
  updatePriceRequest(data: ICreatePriceReq) {
    return this.http.put<IResponse<unknown>>(`${this.baseEndPoint}update-request`, data);
  }
  cancelPriceRequest(priceRequestId: number) {
    return this.http.patch<IResponse<unknown>>(`${this.baseEndPoint}/requests/${priceRequestId}/cancel`, {});
  }
  getMyPriceRequestsAsFacility() {
    return this.http.get<IResponse<IFacilityRequest[]>>(`${this.baseEndPoint}/requests/facility`);
  }
  getMyPriceRequestsAsCompany() {
    return this.http.get<IResponse<ICompanyRequest[]>>(`${this.baseEndPoint}/requests/company`);
  }
}
