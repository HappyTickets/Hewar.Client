import { AdStatus } from '../../../shared/enums/ad-status';
import { ContractType } from '../../../shared/enums/contract-type';
import { IPriceRequestService } from '../../price-requests/models/iprice-request-service';

export interface IUpdateAd {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  status: AdStatus;
  services: IPriceRequestService[];
}

export { AdStatus };
