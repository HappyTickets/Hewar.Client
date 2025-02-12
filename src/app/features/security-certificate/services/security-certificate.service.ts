import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { Observable } from 'rxjs';
import { IEditSecurityCertificate } from '../models/iedit-security-certificate';
import { ISecurityCertificate } from '../models/isecurity-certificate';

@Injectable({
  providedIn: 'root'
})
export class SecurityCertificateService {
  http = inject(HttpClient);
  baseEndPoint = '/api/SecurityCertificate/';

  create(data: IEditSecurityCertificate): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}create`, data);
  }
  update(data: IEditSecurityCertificate): Observable<IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}update`, data);
  }
  delete(id: number): Observable<IApiResponse<null>> {
    return this.http.delete<IApiResponse<null>>(`${this.baseEndPoint}delete`,{params: {id} });
  }
  getById(id: number): Observable<IApiResponse<ISecurityCertificate>> {
    return this.http.get<IApiResponse<ISecurityCertificate>>(`${this.baseEndPoint}getById`,{params: {id} });
  }
  getByFacilityId(facilityId: number): Observable<IApiResponse<ISecurityCertificate>> {
    return this.http.get<IApiResponse<ISecurityCertificate>>(`${this.baseEndPoint}getByFacilityId`,{params: {facilityId} });
  }
  getAll(): Observable<IApiResponse<ISecurityCertificate[]>> {
    return this.http.get<IApiResponse<ISecurityCertificate[]>>(`${this.baseEndPoint}getAll`);
  }
  approve(id: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}approve`,{},{params: {id}});
  }
  reject(id: number): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}reject`,{},{params: {id}});
  }
}
