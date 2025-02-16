import { AdStatus } from '../../../shared/enums/ad-status';
import { ContractType } from '../../../shared/enums/contract-type';
import { IFacility } from '../../price-requests/models/ifacility';
import { IPriceRequestService } from '../../price-requests/models/iprice-request-service';

export interface IAd {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  status: AdStatus;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  services: IPriceRequestService[];
  facility: IFacility;
}
