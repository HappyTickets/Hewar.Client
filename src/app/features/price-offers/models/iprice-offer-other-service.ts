import { ShiftType } from '../../../shared/enums/shift-type';

export interface IPriceOfferOtherService {
  id: number | null;
  name: string;
  quantity: number;
  shiftType: ShiftType;
  dailyCostPerUnit: number;
  monthlyCostPerUnit: number;
}
