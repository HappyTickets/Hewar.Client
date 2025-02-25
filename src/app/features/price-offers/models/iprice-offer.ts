import { ContractType } from '../../../shared/enums/contract-type';
import { RequestStatus } from '../../../shared/enums/request-status';
import { IFacility } from '../../price-requests/models/ifacility';
import { IPriceRequest } from '../../price-requests/models/iprice-request';
import { IPriceOfferOtherService } from './iprice-offer-other-service';
import { IPriceOfferService } from './iprice-offer-service';

export interface IPriceOffer {
  id: number;
  chatId: number | null;
  facility?: IFacility;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  priceRequest: IPriceRequest;

  facilityName: string;
  offerStatus: RequestStatus;
  services: IPriceOfferService[];
  otherServices: IPriceOfferOtherService[];
}
export interface IGetPriceOffersByRequest {
  priceRequest: IPriceRequest;
  offers: IPriceOffer[];
}
