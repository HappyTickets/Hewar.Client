import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ShiftType } from '../../../shared/enums/shift-type';

export interface IFacilityPriceRequest {
  id: number;
  chatId: number | null;
  contractType: ContractType;
  startDate: Date;
  endDate: Date;
  notes?: string;
  requestStatus: RequestStatus;
  hasOffers: boolean;
  company: {
    id: number;
    name: string;
    contactEmail: string;
    phoneNumber: string;
    logo: string;
  };
  services: {
    serviceId: number;
    quantity: number;
    shiftType: ShiftType;
  }[];
  otherServices: {
    id: number;
    name: string;
    quantity: number;
    shiftType: ShiftType;
    monthlyCost?: number;
    dailyCost?: number;
  }[];

  isEditMode?: boolean;
}
