import { ContractType } from '../../../shared/enums/contract-type';
import { ShiftType } from '../../../shared/enums/shift-type';
import { IPriceRequestService } from '../../price-requests/models/iprice-request-service';
import { AdsStatus } from '../enums/adsStatus';

export interface IUpdateAd {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  status: AdsStatus;
  services: IPriceRequestService[];
    otherServices: {
      name: string;
      quantity: 0;
      shiftType: ShiftType;
    }[];
}
