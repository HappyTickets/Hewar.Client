import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICreateFacilities,
  ICreateFacilityResponse,
} from '../models/icreate-facilities';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { IResponseFacilities } from '../models/iresponse-facilities';
import {
  IUpdateFacilities,
  IUpdateResponseFacilities,
} from '../models/iupdate-facilities';
import { throwError } from 'rxjs/internal/observable/throwError';
import { IGetFacilityResponse, IResponseData } from '../models/iresponse-data';
import { IgetByIdResponse } from '../models/iget-by-id-response';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  private readonly apiUrl = '/api/facilities';
  constructor(private _httpClient: HttpClient) {}
  createFacility(
    facility: ICreateFacilities
  ): Observable<ICreateFacilityResponse> {
    return this._httpClient
      .post<ICreateFacilityResponse>(`${this.apiUrl}/create`, facility)
      .pipe(catchError((error) => this.handleError(error)));
  }
  updateFacility(
    facility: IUpdateFacilities
  ): Observable<IUpdateResponseFacilities> {
    return this._httpClient
      .put<IUpdateFacilities>(`${this.apiUrl}/update`, facility)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getFacilityById(
    id: number
  ): Observable<IResponseFacilities<IgetByIdResponse>> {
    return this._httpClient
      .get<IResponseFacilities<IgetByIdResponse>>(`${this.apiUrl}/getById`, {
        params: { id: id.toString() },
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getAllFacilities(): Observable<IGetFacilityResponse> {
    return this._httpClient
      .get<IGetFacilityResponse>(`${this.apiUrl}/getAll`)
      .pipe(catchError((error) => this.handleError(error)));
  }
  softDeleteFacility(
    id: number
  ): Observable<IResponseFacilities<IResponseData>> {
    return this._httpClient
      .delete<IResponseFacilities<IResponseData>>(
        `${this.apiUrl}/softDelete/`,
        {
          params: { id: id.toString() },
        }
      )
      .pipe(catchError((error) => this.handleError(error)));
  }
  hardDeleteFacility(id: number): Observable<void> {
    return this._httpClient
      .delete<void>(`${this.apiUrl}/hardDelete/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error); // Debugging log

    // Check if the error has a response body
    if (error.error) {
      return throwError(() => error.error); // Return full API response
    }

    return throwError(() => ({
      status: error.status || 500,
      isSuccess: false,
      errorCode: 'UNKNOWN_ERROR',
    }));
  }
}
