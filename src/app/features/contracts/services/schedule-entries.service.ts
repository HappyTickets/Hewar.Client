import { inject, Injectable } from '@angular/core';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEditScheduleEntry } from '../models/iedit-schedule-entry';
import { IScheduleEntry } from '../models/ischedule-entry';

@Injectable({
  providedIn: 'root'
})
export class ScheduleEntriesService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/ScheduleEntries/';

  Create(data: IEditScheduleEntry[], contractId:number):Observable <IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}Create`, data, {params: {contractId}})
  }
  Update(data: IEditScheduleEntry[], contractId: number):Observable <IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}Update`, data, {params:{contractId}})
  }
  GetById(entryId: number):Observable <IApiResponse<IScheduleEntry>> {
    return this.http.get<IApiResponse<IScheduleEntry>>(`${this.baseEndPoint}GetById`, {params:{entryId}})
  }
  GetByContractId(contractId: number):Observable <IApiResponse<IScheduleEntry[]>> {
    return this.http.get<IApiResponse<IScheduleEntry[]>>(`${this.baseEndPoint}GetByContractId`, {params:{contractId}})
  }
  Delete(entryId: number):Observable <IApiResponse<null>> {
    return this.http.delete<IApiResponse<null>>(`${this.baseEndPoint}Delete`, {params:{entryId}})
  }
}
