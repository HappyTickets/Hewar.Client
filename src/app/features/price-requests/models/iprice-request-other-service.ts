import { ShiftType } from "../../../shared/enums/shift-type";

export interface IPriceRequestOtherService {
  name: string;
  quantity: number;
  shiftType: ShiftType;
}
