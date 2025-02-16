import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { IFacility } from './ifacility';
import { IPriceRequestOtherService } from './iprice-request-other-service';
import { IPriceRequestService } from './iprice-request-service';

export interface ICompanyPriceRequest {
  id: number;
  chatId: null | number;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  notes?: string;
  requestStatus: RequestStatus;
  hasOffers: boolean;
  services: IPriceRequestService[];
  otherServices: IPriceRequestOtherService[];
  facility: IFacility;
  showActions?: boolean;
}
