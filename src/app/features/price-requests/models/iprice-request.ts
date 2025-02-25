import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ICompany } from '../../companies/models/ICompany';
import { IFacility } from './ifacility';
import { IPriceRequestOtherService } from './iprice-request-other-service';
import { IPriceRequestService } from './iprice-request-service';

export interface IPriceRequest {
  id: number;
  chatId: number | null;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  requestStatus: RequestStatus;
  services: IPriceRequestService[];
  otherServices: IPriceRequestOtherService[];
  facility: IFacility;
  company: ICompany;
  notes: string;
  hasOffers: boolean;
  showActions?: boolean;
}
