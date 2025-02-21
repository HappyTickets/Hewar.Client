import { ContractType } from '../../../shared/enums/contract-type';
import { IPriceRequestService } from '../../price-requests/models/iprice-request-service';
import { AdsStatus } from '../enums/adsStatus';

export interface IUpdateAd {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  status: AdsStatus;
  services: IPriceRequestService[];
}
