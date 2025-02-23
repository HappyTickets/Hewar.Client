import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateAd } from '../models/icreate-ad';
import { IUpdateAd } from '../models/iupdate-ad';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { IAdService } from '../models/iad-service';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/ads/';
  HewarServiceEndPoint = '/api/HewarServices/getAll';

  createAD(data: ICreateAd) {
    return this.http.post<IApiResponse<number>>(
      `${this.baseEndPoint}create`,
      data
    );
  }

  updateAd(data: IUpdateAd): Observable<IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(
      `${this.baseEndPoint}update`,
      data
    );
  }

  getAdById(id: number): Observable<IApiResponse<ICreateAd>> {
    return this.http.get<IApiResponse<ICreateAd>>(
      `${this.baseEndPoint}getAdById`,
      { params: { id } }
    );
  }

  getMyAds(): Observable<IApiResponse<ICreateAd[]>> {
    return this.http.get<IApiResponse<ICreateAd[]>>(
      `${this.baseEndPoint}getMyAds`
    );
  }

  getOpenAds() {
    return this.http.get<IApiResponse<ICreateAd[]>>(
      `${this.baseEndPoint}getOpened`
    );
  }

  deleteAd(id: number) {
    return this.http.delete<IApiResponse<ICreateAd>>(
      `${this.baseEndPoint}delete`,
      { params: { id } }
    );
  }

  getHewarServices(): Observable<IApiResponse<IAdService[]>> {
    return this.http.get<IApiResponse<IAdService[]>>(this.HewarServiceEndPoint);
  }
}
