import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateAd } from '../model/ICreateAd';
import { IUpdateAd } from '../model/IUpdateAd';
import { ICreateOffer } from '../model/ICreateOffer';
import { ICreateOfferMessage } from '../model/ICreateOfferMessage';
import { Observable } from 'rxjs';
import { IResponse } from '../model/IResponsive';
import { IGetAdById } from '../model/IGetAdById';
import { IGetOpenedAds } from '../model/IGetOpenedAds';
import { IGetMyOffersAsFacility } from '../model/IGetMyOffersAsFacility';
import { IGetMyOffersAsCompany } from '../model/IGetMyOffersAsCompany';
import { IGetOfferMessages } from '../model/IGetOfferMessages';
import { IGetMyAds } from '../model/IGetMyAds';

@Injectable({
  providedIn: 'root'
})
export class InsuranceAdsService {
  baseEndPoint = '/api/insuranceAds/'
  constructor(private _httpClient:HttpClient) { }

  createAd(data:ICreateAd):Observable<IResponse<ICreateAd>>{
    return this._httpClient.post<IResponse<ICreateAd>>(`${this.baseEndPoint}createAd`, data)
  }
  updateAd(data:IUpdateAd):Observable<IResponse<IUpdateAd>>{
    return this._httpClient.put<IResponse<IUpdateAd>>(`${this.baseEndPoint}updateAd`, data)
  }
  getAdById(id:number):Observable<IResponse<IGetAdById>>{
    return this._httpClient.get<IResponse<IGetAdById>>(`${this.baseEndPoint}getAdById?id=`+ id)
  }
  getMyAds():Observable<IResponse<IGetMyAds[]>>{
    return this._httpClient.get<IResponse<IGetMyAds[]>>(`${this.baseEndPoint}getMyAds`)
  }
  getOpenedAds():Observable<IResponse<IGetOpenedAds[]>>{
    return this._httpClient.get<IResponse<IGetOpenedAds[]>>(`${this.baseEndPoint}getOpenedAds`)
  }
  createOffer(data:ICreateOffer):Observable<IResponse<ICreateOffer>>{
    return this._httpClient.post<IResponse<ICreateOffer>>(`${this.baseEndPoint}createOffer`, data)
  }
  acceptOffer(id:number, data:any):Observable<IResponse<any>>{
    return this._httpClient.patch<IResponse<any>>(`${this.baseEndPoint}acceptOffer?offerId=` + id, data)
  }
  rejectOffer(id:number, data:any):Observable<IResponse<any>>{
    return this._httpClient.patch<IResponse<any>>(`${this.baseEndPoint}rejectOffer?offerId=` + id, data)
  }
  cancelOffer(id:number, data:any):Observable<IResponse<any>>{
    return this._httpClient.patch<IResponse<any>>(`${this.baseEndPoint}cancelOffer?offerId=` + id, data)
  }
  getMyOffersByAdIdAsFacility(id:number):Observable<IResponse<any>>{
    return this._httpClient.get<IResponse<any>>(`${this.baseEndPoint}getMyOffersByAdIdAsFacility?id=` + id)
  }
  getMyOffersAsFacility():Observable<IResponse<IGetMyOffersAsFacility[]>>{
    return this._httpClient.get<IResponse<IGetMyOffersAsFacility[]>>(`${this.baseEndPoint}getMyOffersAsFacility`)
  }
  getMyOffersByAdIdAsCompany(id:number):Observable<IResponse<any>>{
    return this._httpClient.get<IResponse<any>>(`${this.baseEndPoint}getMyOffersByAdIdAsCompany?id=` + id)
  }
  getMyOffersAsCompany():Observable<IResponse<IGetMyOffersAsCompany[]>>{
    return this._httpClient.get<IResponse<IGetMyOffersAsCompany[]>>(`${this.baseEndPoint}getMyOffersAsCompany`)
  }
  createOfferMessage(data:ICreateOfferMessage):Observable<IResponse<any>>{
    return this._httpClient.post<IResponse<any>>(`${this.baseEndPoint}createOfferMessage`, data)
  }
  getOfferMessages(id:number):Observable<IResponse<IGetOfferMessages[]>>{
    return this._httpClient.get<IResponse<IGetOfferMessages[]>>(`${this.baseEndPoint}getOfferMessages?id=` + id)
  }
}

