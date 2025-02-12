import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ICompany } from '../../companies/models/ICompany';
import { IPriceRequestOtherService } from './iprice-request-other-service';
import { IPriceRequestService } from './iprice-request-service';

export interface IFacilityPriceRequest {
  id: number;
  chatId: number | null;
  contractType: ContractType;
  startDate: Date;
  endDate: Date;
  notes?: string;
  requestStatus: RequestStatus;
  hasOffers: boolean;
  company: ICompany;
  services: IPriceRequestService[];
  otherServices: IPriceRequestOtherService[];

  showActions?: boolean;
}
