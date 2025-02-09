import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ShiftType } from '../../../shared/enums/shift-type';

export interface ICompanyPriceRequest {
  id: number;
  chatId: null | number;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  notes: string;
  requestStatus: RequestStatus;
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
  hasOffers: boolean;
  facility: {
    id: number;
    name: string;
    type: string;
    responsibleName: string;
    responsiblePhone: string;
    logo: string;
  };
  isEditMode?: boolean;
}
