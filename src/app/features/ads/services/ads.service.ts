import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateAd } from '../models/icreate-ad';
import { IResponse } from '../../insurance-ads/model/IResponsive';
import { IUpdateAd } from '../models/iupdate-ad';
import { IGetHewarService } from '../models/iget-hewar-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/ads/';
  HewarServiceEndPoint = '/api/HewarServices/getAll';

  createAD(data: ICreateAd) {
    return this.http.post<IResponse<number>>(
      `${this.baseEndPoint}create`,
      data
    );
  }
  updateAd(data: IUpdateAd) {
    return this.http.put<IResponse<unknown>>(
      `${this.baseEndPoint}update`,
      data
    );
  }

  getAdById(adId: number) {
    return this.http.get<IResponse<ICreateAd>>(`${this.baseEndPoint}${adId}`);
  }

  getMyAds() {
    return this.http.get<IResponse<ICreateAd[]>>(
      `${this.baseEndPoint}getMyAds`
    );
  }

  getOpenAds() {
    return this.http.get<IResponse<ICreateAd[]>>(
      `${this.baseEndPoint}getOpened`
    );
  }

  getHewarServices(): Observable<{ label: string; value: number }[]> {
    return this.http
      .get<IResponse<IGetHewarService[]>>(this.HewarServiceEndPoint)
      .pipe(
        map((response) => {
          if (response && response.isSuccess && Array.isArray(response.data)) {
            return response.data.map((service) => ({
              label: service.name,
              value: service.id,
            }));
          } else {
            console.error('API returned invalid data format:', response);
            return [];
          }
        })
      );
  }
}
