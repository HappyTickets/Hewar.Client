import { ShiftType } from '../../../shared/enums/shift-type';

export interface IPriceRequestService {
  serviceId: number;
  serviceName?: string;
  quantity: number;
  shiftType: ShiftType;
}
