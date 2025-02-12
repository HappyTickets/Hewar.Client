import { RequestStatus } from '../../../shared/enums/request-status';
import { ICompany } from '../../companies/models/ICompany';
import { IFacility } from '../../price-requests/models/ifacility';
import { IPriceRequest } from '../../price-requests/models/iprice-request';
import { IPriceOfferOtherService } from './iprice-offer-other-service';
import { IPriceOfferService } from './iprice-offer-service';

export interface IGetPriceOfferById {
  id: number;
  chatId: number | null;
  facility?: IFacility;
  comapny?: ICompany;
  offerStatus: RequestStatus;
  otherServices: IPriceOfferOtherService[];
  services: IPriceOfferService[];
  priceRequest: IPriceRequest;
  showActions?: boolean;
}
