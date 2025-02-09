import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ShiftType } from '../../../shared/enums/shift-type';
import { IPriceRequest } from '../../price-requests/models/iprice-request';

export interface IPriceOffer {
  id: number;
  chatId: number | null;
  priceRequest: {
    id: number;
    chatId: number | null;
    contractType: ContractType;
    startDate: string;
    endDate: string;
    companyId: number;
    companyName: string;
    status: RequestStatus;
    notes: string;
  };
  facilityName: string;
  offerStatus: RequestStatus;
  services: {
    serviceId: number;
    quantity: number;
    dailyCostPerUnit: number;
    monthlyCostPerUnit: number;
    shiftType: ShiftType;
  }[];
  otherServices: {
    id: number;
    name: string;
    quantity: number;
    shiftType: ShiftType;
    dailyCostPerUnit: number;
    monthlyCostPerUnit: number;
  }[];
}
export interface IGetPriceOffersByRequest {
  offers: IPriceOffer[];
  priceRequest: IPriceRequest;
}
