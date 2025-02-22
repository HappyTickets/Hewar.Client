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

  create(data: ICreatePriceOffer):Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}create`, data);
  }
  update(data: IUpdatePriceOffer):Observable <IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}update`, data);
  }
  accept(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}accept`, {} ,{params: { offerId }});
  }
  reject(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}reject`, {} , {params: { offerId }});
  }
  hide(priceOfferId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}hide`, {} , {params: { priceOfferId }});
  }
  show(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}show`, {} , {params: { offerId }});
  }
  cancel(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}cancel`, {} , {params: { offerId }});
  }
  getById(offerId: number):Observable <IApiResponse<IPriceOffer>> {
    return this.http.get<IApiResponse<IPriceOffer>>(`${this.baseEndPoint}getById`,{params: { offerId }});
  }
  getMyCompanyOffers(): Observable <IApiResponse<IPriceOffer[]>> {
    return this.http.get<IApiResponse<IPriceOffer[]>>(`${this.baseEndPoint}getMyCompanyOffers`);
  }
  getMyFacilityOffers():Observable<IApiResponse<IPriceOffer[]>> {
    return this.http.get<IApiResponse<IPriceOffer[]>>(`${this.baseEndPoint}getMyFacilityOffers`);
  }
  getMyCompanyOffersByRequestId(requestId: number):Observable<IApiResponse<IGetPriceOffersByRequest>> {
    return this.http.get<IApiResponse<IGetPriceOffersByRequest>>(`${this.baseEndPoint}getMyCompanyOffersByRequestId`, {params: {requestId}});
  }
  getMyFacilityOffersByRequestId(requestId: number) {
    return this.http.get(`${this.baseEndPoint}getMyFacilityOffersByRequestId`,{params: {requestId}});
  }
}
