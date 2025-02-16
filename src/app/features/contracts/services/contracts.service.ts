import { IGetContractTemplateById } from '../models/iget-contract-template-by-id';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { IUpdateContract } from '../models/iupdate-contract';
import { IFillContract } from '../models/ifill-contract';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContract } from '../models/icontract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/Contracts/';

  fillFields(data: IFillContract):Observable <IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}fillFields`, data)
  }
  updateFields(data: IUpdateContract):Observable <IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}updateFields`, data)
  }
  signContract(contractId:number , signature:string):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}signContract`,{},{params:{contractId,signature}})
  }
  getFieldsByContractId(contractId: number):Observable <IApiResponse<IContract>> {
    return this.http.get<IApiResponse<IContract>>(`${this.baseEndPoint}getFieldsByContractId`,{params: {contractId}})
  }
  getContractTemplateById(contractId: number):Observable <IApiResponse<IGetContractTemplateById>> {
    return this.http.get<IApiResponse<IGetContractTemplateById>>(`${this.baseEndPoint}getContractTemplateById`, {params: {contractId}})
  }
  getContractFieldsByOfferId(offerId: number):Observable <IApiResponse<IContract>> {
    return this.http.get<IApiResponse<IContract>>(`${this.baseEndPoint}getContractFieldsByOfferId`, {params: {offerId}})
  }
  getContractTemplateByOfferId(offerId: number):Observable <IApiResponse<IContract>> {
    return this.http.get<IApiResponse<IContract>>(`${this.baseEndPoint}getContractTemplateByOfferId`, {params: {offerId}})
  }
}
