import { AdStatus } from '../../../shared/enums/ad-status';
import { ContractType } from '../../../shared/enums/contract-type';
import { ShiftType } from '../../../shared/enums/shift-type';

export interface IUpdateAd {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  status: AdStatus;
  services: [
    {
      serviceId: number;
      quantity: number;
      shiftType: ShiftType;
    }
  ];
}
