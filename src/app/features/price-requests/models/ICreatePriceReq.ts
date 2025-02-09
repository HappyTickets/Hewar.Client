import { ContractType } from '../../../shared/enums/contract-type';
import { ShiftType } from '../../../shared/enums/shift-type';

export interface ICreatePriceReq {
  priceRequestId?: number;
  companyId?: number;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  notes: string;
  services: [
    {
      serviceId: number;
      quantity: number;
      shiftType: ShiftType;
    }
  ];
  otherServices: [
    {
      name: string;
      quantity: number;
      shiftType: ShiftType;
    }
  ];
}
