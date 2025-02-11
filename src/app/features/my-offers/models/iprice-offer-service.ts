import { ShiftType } from "../../../shared/enums/shift-type";

export interface IPriceOfferService {
  serviceId: number;
  quantity: number;
  dailyCostPerUnit: number;
  monthlyCostPerUnit: number;
  shiftType: ShiftType;
}
