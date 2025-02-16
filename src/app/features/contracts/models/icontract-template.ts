<<<<<<< HEAD
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
=======
import { IPriceOfferOtherService } from "../../my-offers/models/iprice-offer-other-service";
import { IPriceOfferService } from "../../my-offers/models/iprice-offer-service";

export interface IContractTemplate {
  contractTitle: {
    ar: string;
    en: string;
  };
  preamble: {
    title: {
      ar: string;
      en: string;
    };
    parties: {
      firstParty: {
        description: {
          ar: string;
          en: string;
        };
      };
      secondParty: {
        description: {
          ar: string;
          en: string;
        };
      };
    };
    introduction: {
      ar: string;
      en: string;
    };
    conditions: {
      ar: string;
      en: string;
    }[];
  };
  clauses: {
    number: number;
    title: {
      ar: string;
      en: string;
    };
    ar: string;
    en: string;
  }[];
  customClauses: {
    ar: string;
    en: string;
  }[];
  scheduleEntries: {
    location: {
      ar: string;
      en: string;
    };
    guardsRequired: {
      ar: string;
      en: string;
    };
    shiftTime: {
      ar: string;
      en: string;
    };
    notes: {
      ar: string;
      en: string;
    };
  }[];
  servicesOffer: IPriceOfferService[];
  otherServicesOffer: IPriceOfferOtherService[];
  duties_Services: { ar: string; en: string }[];
  closingRemark: { ar: string; en: string };
  signatures: {
    partyOneSignature: string;
    partyTwoSignature: string;
  };
>>>>>>> 1f61da8 (create the services, models, form component)
}
