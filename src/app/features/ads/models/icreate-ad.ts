import { ContractType } from '../../../shared/enums/contract-type';
import { IPriceRequestService } from '../../price-requests/models/iprice-request-service';

export interface ICreateAd {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  services: IPriceRequestService[];
  showActions?: boolean;
}
