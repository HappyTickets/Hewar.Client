import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { IGetPriceOffersByRequest } from '../models/iprice-offer';
import { IGetPriceOfferById } from '../models/iget-price-offer-by-id';
import { ICreatePriceOffer } from '../models/icreate-price-offer';
import { IUpdatePriceOffer } from '../models/iupdate-price-offer';
import { IPaginationResponse } from '../../../shared/models/ipagination-response';

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
  getById(offerId: number):Observable <IApiResponse<IGetPriceOfferById>> {
    return this.http.get<IApiResponse<IGetPriceOfferById>>(`${this.baseEndPoint}getById`,{params: { offerId }});
  }
  accept(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}accept`, {} ,{params: { offerId }});
  }
  reject(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}reject`, {} , {params: { offerId }});
  }
  cancel(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}cancel`, {} , {params: { offerId }});
  }
  hide(priceOfferId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}hide`, {} , {params: { priceOfferId }});
  }
  show(offerId: number):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}show`, {} , {params: { offerId }});
  }
  getMyCompanyOffers(PageNumber: number, PageSize: number): Observable <IPaginationResponse<IGetPriceOfferById[]>> {
    return this.http.get<IPaginationResponse<IGetPriceOfferById[]>>(`${this.baseEndPoint}getMyCompanyOffers`, {params: {PageNumber,PageSize}});
  }
  getMyFacilityOffers(PageNumber: number, PageSize: number):Observable<IPaginationResponse<IGetPriceOfferById[]>> {
    return this.http.get<IPaginationResponse<IGetPriceOfferById[]>>(`${this.baseEndPoint}getMyFacilityOffers`,  {params: {PageNumber,PageSize}});
  }
  getOffersByRequestId(requestId: number, PageNumber: number, PageSize: number):Observable<IPaginationResponse<IGetPriceOffersByRequest>> {
    return this.http.get<IPaginationResponse<IGetPriceOffersByRequest>>(`${this.baseEndPoint}getOffersByRequestId`, {params: {requestId,PageNumber,PageSize}});
  }
}
