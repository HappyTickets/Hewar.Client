import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreatePriceOffer } from '../models/icreate-price-offer';
import { IUpdatePriceOffer } from '../models/iupdate-price-offer';

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
  accept(offerId: number) {
    return this.http.patch(`${this.baseEndPoint}accept`, {} ,{params: { offerId }});
  }
  reject(offerId: number) {
    return this.http.patch(`${this.baseEndPoint}reject`, {} , {params: { offerId }});
  }
  cancel(offerId: number) {
    return this.http.patch(`${this.baseEndPoint}cancel`, {} , {params: { offerId }});
  }
  getMyCompanyOffers() {
    return this.http.get(`${this.baseEndPoint}getMyCompanyOffers`);
  }
  getMyCompanyOffersByRequestId(requestId: number) {
    return this.http.get(`${this.baseEndPoint}getMyCompanyOffersByRequestId`, {params: {requestId}});
  }
  getMyFacilityOffers() {
    return this.http.get(`${this.baseEndPoint}getMyFacilityOffers`);
  }
  getMyFacilityOffersByRequestId(requestId: number) {
    return this.http.get(`${this.baseEndPoint}getMyFacilityOffersByRequestId`,{params: {requestId}});
  }
}
