import { ContractType } from '../../../shared/enums/contract-type';
import { ShiftType } from '../../../shared/enums/shift-type';
import { AdStatus } from './iupdate-ad';

export interface ICreateAd {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  status?: AdStatus;
  showActions?: boolean;
  services: {
    serviceId: number;
    quantity: number;
    shiftType: ShiftType;
  }[];
}
