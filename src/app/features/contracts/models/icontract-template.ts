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
}
