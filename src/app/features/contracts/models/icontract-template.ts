import { IPriceOfferOtherService } from '../../my-offers/models/iprice-offer-other-service';
import { IPriceOfferService } from '../../my-offers/models/iprice-offer-service';
import { IClause } from './iclause';
import { IContractKey } from './icontract-key';
import { IScheduleEntry } from './ischedule-entry';

export interface IContractTemplate {
  contractId: number;
  offerDate: string;
  offerNumber: number;
  facilitySignature: string | null;
  companySignature: string | null;
  staticContractTemplate: StaticContractTemplate;
  staticClauses: StaticClauses[];
  customClauses: IClause[];
  contractKeys: IContractKey[];
  otherServices: IPriceOfferOtherService[];
  services: IPriceOfferService[];
  scheduleEntries: IScheduleEntry[];
}
export interface StaticClauses {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}
export interface StaticContractTemplate {
  titleAr: string;
  titleEn: string;
  preambleAr: string;
  preambleEn: string;
  closingRemarkAr: string;
  closingRemarkEn: string;
}
