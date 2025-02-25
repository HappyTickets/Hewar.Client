import { ContractType } from "../../../shared/enums/contract-type";
import { IPriceOfferOtherService } from "./iprice-offer-other-service";
import { IPriceOfferService } from "./iprice-offer-service";

export interface ICreatePriceOffer {
  priceRequestId: number;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  services: IPriceOfferService[];
  otherServices: IPriceOfferOtherService[];
}
