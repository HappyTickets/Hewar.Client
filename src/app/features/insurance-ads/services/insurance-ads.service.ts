import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateAd } from '../model/ICreateAd';
import { IUpdateAd } from '../model/IUpdateAd';
import { ICreateOffer } from '../model/ICreateOffer';
import { ICreateOfferMessage } from '../model/ICreateOfferMessage';
import { Observable } from 'rxjs';
import { IGetAdById } from '../model/IGetAdById';
import { IGetOpenedAds } from '../model/IGetOpenedAds';
import { IGetMyOffersAsFacility } from '../model/IGetMyOffersAsFacility';
import { IGetMyOffersAsCompany } from '../model/IGetMyOffersAsCompany';
import { IGetOfferMessages } from '../model/IGetOfferMessages';
import { IGetMyAds } from '../model/IGetMyAds';
import { IApiResponse } from '../../../shared/models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class InsuranceAdsService {
  baseEndPoint = '/api/insuranceAds/'
  constructor(private _httpClient:HttpClient) { }

  createAd(data:ICreateAd):Observable<IApiResponse<ICreateAd>>{
    return this._httpClient.post<IApiResponse<ICreateAd>>(`${this.baseEndPoint}createAd`, data)
  }
  updateAd(data:IUpdateAd):Observable<IApiResponse<IUpdateAd>>{
    return this._httpClient.put<IApiResponse<IUpdateAd>>(`${this.baseEndPoint}updateAd`, data)
  }
  getAdById(id:number):Observable<IApiResponse<IGetAdById>>{
    return this._httpClient.get<IApiResponse<IGetAdById>>(`${this.baseEndPoint}getAdById?id=`+ id)
  }
  getMyAds():Observable<IApiResponse<IGetMyAds[]>>{
    return this._httpClient.get<IApiResponse<IGetMyAds[]>>(`${this.baseEndPoint}getMyAds`)
  }
  getOpenedAds():Observable<IApiResponse<IGetOpenedAds[]>>{
    return this._httpClient.get<IApiResponse<IGetOpenedAds[]>>(`${this.baseEndPoint}getOpenedAds`)
  }
  createOffer(data:ICreateOffer):Observable<IApiResponse<ICreateOffer>>{
    return this._httpClient.post<IApiResponse<ICreateOffer>>(`${this.baseEndPoint}createOffer`, data)
  }
  acceptOffer(id:number, data:any):Observable<IApiResponse<any>>{
    return this._httpClient.patch<IApiResponse<any>>(`${this.baseEndPoint}acceptOffer?offerId=` + id, data)
  }
  rejectOffer(id:number, data:any):Observable<IApiResponse<any>>{
    return this._httpClient.patch<IApiResponse<any>>(`${this.baseEndPoint}rejectOffer?offerId=` + id, data)
  }
  cancelOffer(id:number, data:any):Observable<IApiResponse<any>>{
    return this._httpClient.patch<IApiResponse<any>>(`${this.baseEndPoint}cancelOffer?offerId=` + id, data)
  }
  getMyOffersByAdIdAsFacility(id:number):Observable<IApiResponse<any>>{
    return this._httpClient.get<IApiResponse<any>>(`${this.baseEndPoint}getMyOffersByAdIdAsFacility?id=` + id)
  }
  getMyOffersAsFacility():Observable<IApiResponse<IGetMyOffersAsFacility[]>>{
    return this._httpClient.get<IApiResponse<IGetMyOffersAsFacility[]>>(`${this.baseEndPoint}getMyOffersAsFacility`)
  }
  getMyOffersByAdIdAsCompany(id:number):Observable<IApiResponse<any>>{
    return this._httpClient.get<IApiResponse<any>>(`${this.baseEndPoint}getMyOffersByAdIdAsCompany?id=` + id)
  }
  getMyOffersAsCompany():Observable<IApiResponse<IGetMyOffersAsCompany[]>>{
    return this._httpClient.get<IApiResponse<IGetMyOffersAsCompany[]>>(`${this.baseEndPoint}getMyOffersAsCompany`)
  }
  createOfferMessage(data:ICreateOfferMessage):Observable<IApiResponse<any>>{
    return this._httpClient.post<IApiResponse<any>>(`${this.baseEndPoint}createOfferMessage`, data)
  }
  getOfferMessages(id:number):Observable<IApiResponse<IGetOfferMessages[]>>{
    return this._httpClient.get<IApiResponse<IGetOfferMessages[]>>(`${this.baseEndPoint}getOfferMessages?id=` + id)
  }
}

