import { ContractType } from '../../../shared/enums/contract-type';
import { ShiftType } from '../../../shared/enums/shift-type';

export interface ICreateAd {
  id?: number ;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  contractType: ContractType;
  services: [
    {
      serviceId: number;
      quantity: number;
      shiftType: ShiftType;
    }
  ];
}
