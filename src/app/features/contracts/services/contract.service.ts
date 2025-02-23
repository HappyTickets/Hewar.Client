import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { ICreateContract } from '../models/icreate-contract';
import { IContractKeys } from '../models/icontract-keys';
import { IContractTemplate } from '../models/icontract-template';
import { IContractFields } from '../models/icontract-fields';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private http = inject(HttpClient);
  baseEndPoint = '/api/Contracts/';

  CreateContractForOffer(data: ICreateContract, offerId:number):Observable <IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}CreateContractForOffer`, data, {params: {offerId}})
  }
  CreateContractForCompany(data: ICreateContract, companyId: number, facilityId:number):Observable <IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(`${this.baseEndPoint}CreateContractForCompany`, data, {params:{companyId,facilityId}})
  }
  UpdateContractByFields(data: ICreateContract, contractId: number):Observable <IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}UpdateContractByFields`, data, {params: {contractId}})
  }
  UpdateContractByKeys(data: {contractKeyId: number, newValue: string}[], contractId: number):Observable <IApiResponse<null>> {
    return this.http.put<IApiResponse<null>>(`${this.baseEndPoint}UpdateContractByKeys`, data,{params: {contractId}})
  }
  GetById(contractId: number):Observable <IApiResponse<IContractTemplate>> {
    return this.http.get<IApiResponse<IContractTemplate>>(`${this.baseEndPoint}GetById`,{params: {contractId}})
  }
  GetByOfferId(offerId: number):Observable <IApiResponse<IContractTemplate>> {
    return this.http.get<IApiResponse<IContractTemplate>>(`${this.baseEndPoint}GetByOfferId`, {params: {offerId}})
  }
  GetContractKeysByContractId(contractId: number):Observable <IApiResponse<IContractKeys>> {
    return this.http.get<IApiResponse<IContractKeys>>(`${this.baseEndPoint}GetContractKeysByContractId`, {params: {contractId}})
  }
  GetContractKeysByOfferId(offerId: number):Observable <IApiResponse<IContractKeys>> {
    return this.http.get<IApiResponse<IContractKeys>>(`${this.baseEndPoint}GetContractKeysByOfferId`, {params: {offerId}})
  }
  GetContractFieldsByOfferId(offerId: number):Observable <IApiResponse<IContractFields>> {
    return this.http.get<IApiResponse<IContractFields>>(`${this.baseEndPoint}GetContractFieldsByOfferId`, {params: {offerId}})
  }
  GetContractFieldsByContractId(contractId: number):Observable <IApiResponse<IContractFields>> {
    return this.http.get<IApiResponse<IContractFields>>(`${this.baseEndPoint}GetContractFieldsByContractId`, {params: {contractId}})
  }
  signContract(contractId:number , signature:string):Observable <IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(`${this.baseEndPoint}signContract`,{},{params:{contractId,signature}})
  }
}

