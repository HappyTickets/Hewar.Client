import { ShiftType } from '../../../shared/enums/shift-type';

export interface ICreatePriceOffer {
  priceRequestId: number;
  services: [
    {
      serviceId: number;
      quantity: number;
      dailyCostPerUnit: number;
      monthlyCostPerUnit: number;
      shiftType: ShiftType;
    }
  ];
  otherServices: [
    {
      name: string;
      quantity: number;
      shiftType: ShiftType;
      dailyCostPerUnit: number;
      monthlyCostPerUnit: number;
    }
  ];
}
