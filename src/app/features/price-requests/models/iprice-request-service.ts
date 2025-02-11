import { ShiftType } from "../../../shared/enums/shift-type";

export interface IPriceRequestService {
  serviceId: number;
  quantity: number;
  shiftType: ShiftType;
}
