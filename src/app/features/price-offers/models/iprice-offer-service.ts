import { ShiftType } from "../../../shared/enums/shift-type";

export interface IPriceOfferService {
  serviceId: number;
  serviceName: string;
  quantity: number;
  dailyCostPerUnit: number;
  monthlyCostPerUnit: number;
  shiftType: ShiftType;
}
