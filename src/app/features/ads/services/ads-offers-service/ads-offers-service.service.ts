import { inject, Injectable } from '@angular/core';
import { IAdOffer } from '../../models/ads-offers-interfaces/iad-offer';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/models/IApiResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdsOffersServiceService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/AdsOffers/';

  createAdOffer(data: IAdOffer) {
    return this.http.post<IApiResponse<number>>(
      `${this.baseEndPoint}create`,
      data
    );
  }

  updateAdOffer(data: IAdOffer): Observable<IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(
      `${this.baseEndPoint}update`,
      data
    );
  }

  hideAdOffer(adId: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(
      `${this.baseEndPoint}hide/${adId}`,
      {}
    );
  }

  showAdOffer(adId: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(
      `${this.baseEndPoint}show/${adId}`,
      {}
    );
  }

  acceptAdOfer(adId: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(
      `${this.baseEndPoint}accept/${adId}`,
      {}
    );
  }

  rejectAdOffer(adId: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(
      `${this.baseEndPoint}reject/${adId}`,
      {}
    );
  }

  cancelAdOffer(adId: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(
      `${this.baseEndPoint}cancel/${adId}`,
      {}
    );
  }
}
