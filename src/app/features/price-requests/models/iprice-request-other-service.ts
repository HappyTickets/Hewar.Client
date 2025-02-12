import { ShiftType } from "../../../shared/enums/shift-type";

export interface IPriceRequestOtherService {
  id?: number;
  name: string;
  quantity: number;
  shiftType: ShiftType;
}
