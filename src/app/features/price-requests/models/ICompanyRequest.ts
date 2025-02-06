import { RequestStatus } from '../../../shared/enums/request-status';
import { ShiftType } from '../../../shared/enums/shift-type';

export interface ICompanyRequest {
  Id: number;
  OfferStatus: RequestStatus;
  Services: {
    ServiceId: number;
    Quantity: number;
    ShiftType: ShiftType;
    MonthlyCostPerUnit?: number;
    DailyCostPerUnit?: number;
  }[];
}
