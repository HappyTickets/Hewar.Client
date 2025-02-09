import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ShiftType } from '../../../shared/enums/shift-type';
import { ICompany } from '../../companies/models/ICompany';
import { IFacility } from './ifacility';

export interface IPriceRequest {
  id: number;
  company: ICompany;
  facility: IFacility;
  chatId: null | number;
  companyName: string;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  hasOffers: boolean;
  notes?: string;
  status: RequestStatus;
  otherServices: {
    id: number;
    name: string;
    quantity: number;
    shiftType: ShiftType;
  }[];
  services: {
    serviceId: number;
    quantity: number;
    shiftType: ShiftType;
  }[];
}
