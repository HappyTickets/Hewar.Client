import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';

export interface IFacilityRequest {
  PriceRequestId: number;
  ContractType: ContractType;
  StartDate: string;
  EndDate: string;
  Notes: string;
  Status: RequestStatus;
}
