import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ShiftType } from '../../../shared/enums/shift-type';
import { IPriceOffer } from '../../my-offers/models/iprice-offer';

export interface ICompanyPriceRequest {
  id: number;
  chatId: null | number;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  notes: string;
  requestStatus: RequestStatus;
  hasOffers: boolean;
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
  facility: {
    id: number;
    name: string;
    type: string;
    responsibleName: string;
    responsiblePhone: string;
    logo: string;
  };
  offers: IPriceOffer[];
}
