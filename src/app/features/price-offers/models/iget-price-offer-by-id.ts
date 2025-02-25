import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { ICompany } from '../../companies/models/ICompany';
import { IFacility } from '../../price-requests/models/ifacility';
import { IPriceOfferOtherService } from './iprice-offer-other-service';
import { IPriceOfferService } from './iprice-offer-service';

export interface IGetPriceOfferById {
  id: number;
  chatId: number | null;
  facility: IFacility;
  company: ICompany;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  offerStatus: RequestStatus;
  otherServices: IPriceOfferOtherService[];
  services: IPriceOfferService[];
  priceRequest: {
    id: 83;
    chatId: number | null;
    contractType: ContractType;
    startDate: string;
    endDate: string;
    company: ICompany;
    status: RequestStatus;
    notes: string;
  };
  showActions?: boolean;
}
