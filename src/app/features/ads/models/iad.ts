import { ContractType } from '../../../shared/enums/contract-type';
import { IFacility } from '../../price-requests/models/ifacility';
import { IPriceRequestService } from '../../price-requests/models/iprice-request-service';
import { AdsStatus } from '../enums/adsStatus';

export interface IAd {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  status: AdsStatus;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  services: IPriceRequestService[];
  facility: IFacility;
}
