import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreatePriceOffer } from '../models/icreate-price-offer';
import { IUpdatePriceOffer } from '../models/iupdate-price-offer';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { IGetPriceOffersByRequest, IPriceOffer } from '../models/iprice-offer';

@Injectable({
  providedIn: 'root',
})
export class PriceOffersService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/PriceOffers/';

  create(data: ICreatePriceOffer) {
    return this.http.post(`${this.baseEndPoint}create`, data);
  }
  update(data: IUpdatePriceOffer) {
    return this.http.put(`${this.baseEndPoint}update`, data);
  }
  getById(offerId: number) {
    return this.http.get(`${this.baseEndPoint}getById`,{params: { offerId }});
  }
  accept(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}accept`, {} ,{params: { offerId }});
  }
  reject(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}reject`, {} , {params: { offerId }});
  }
  hide(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}hide`, {} , {params: { offerId }});
  }
  cancel(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}cancel`, {} , {params: { offerId }});
  }
  getMyCompanyOffers(): Observable <IApiResponse<IPriceOffer[]>> {
    return this.http.get<IApiResponse<IPriceOffer[]>>(`${this.baseEndPoint}getMyCompanyOffers`);
  }
  getMyCompanyOffersByRequestId(requestId: number):Observable<IApiResponse<IGetPriceOffersByRequest>> {
    return this.http.get<IApiResponse<IGetPriceOffersByRequest>>(`${this.baseEndPoint}getMyCompanyOffersByRequestId`, {params: {requestId}});
  }
  getMyFacilityOffers():Observable<IApiResponse<IGetPriceOffersByRequest[]>> {
    return this.http.get<IApiResponse<IGetPriceOffersByRequest[]>>(`${this.baseEndPoint}getMyFacilityOffers`);
  }
  getMyFacilityOffersByRequestId(requestId: number) {
    return this.http.get(`${this.baseEndPoint}getMyFacilityOffersByRequestId`,{params: {requestId}});
  }
}
