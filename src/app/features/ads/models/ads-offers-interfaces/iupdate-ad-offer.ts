import { ShiftType } from "../../../../shared/enums/shift-type";

export interface IUpdateAdOffer {
     Id: number;
      servicesCost: {
        serviceId: 0;
        quantity: 0;
        shiftType: ShiftType;
        dailyCostPerUnit: number;
        monthlyCostPerUnit: number;
      }[];
      otherServicesCost: {
        name: string;
        quantity: number;
        shiftType: ShiftType;
        dailyCostPerUnit: number;
        monthlyCostPerUnit: number;
      }[];
      companyServicesCost: {
        serviceId: 0;
        quantity: 0;
        dailyCostPerUnit: number;
        monthlyCostPerUnit: number;
        shiftType: ShiftType;
      }[];
}
