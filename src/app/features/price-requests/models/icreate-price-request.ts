import { ContractType } from '../../../shared/enums/contract-type';
import { IPriceRequestOtherService } from './iprice-request-other-service';
import { IPriceRequestService } from './iprice-request-service';

export interface ICreatePriceRequest {
  priceRequestId?: number;
  companyId?: number;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  notes: string;
  services: IPriceRequestService[];
  otherServices?: IPriceRequestOtherService[];
}
