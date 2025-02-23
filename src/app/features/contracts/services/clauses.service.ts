import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { IClause } from '../models/iclause';

@Injectable({
  providedIn: 'root'
})
export class ClausesService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/Clauses/';

  CreateCustomClauses(data: IClause[], contractId:number):Observable <IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}CreateCustomClauses`, data, {params: {contractId}})
  }
  UpdateCustomClauses(data: IClause[], contractId: number):Observable <IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}UpdateCustomClauses`, data, {params:{contractId}})
  }
  GetCustomClauseById(contractId: number):Observable <IApiResponse<IClause>> {
    return this.http.get<IApiResponse<IClause>>(`${this.baseEndPoint}GetCustomClauseById`, {params:{contractId}})
  }
  GetCustomClausesByContractId(contractId: number):Observable <IApiResponse<IClause[]>> {
    return this.http.get<IApiResponse<IClause[]>>(`${this.baseEndPoint}GetCustomClausesByContractId`, {params:{contractId}})
  }
  DeleteCustomClause(clauseId: number):Observable <IApiResponse<null>> {
    return this.http.delete<IApiResponse<null>>(`${this.baseEndPoint}DeleteCustomClause`, {params:{clauseId}})
  }
}
