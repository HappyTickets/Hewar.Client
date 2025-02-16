<<<<<<< HEAD
import { IContractKey } from "./icontract-key";

export interface IContract {
  contractId: number;
  contractKeys: IContractKey[];
=======
export interface IContract {
  contractId?: number;
  contractSignDate: string;
  contractStartDate: string;
  partyOne: {
    name: {
      ar: string;
      en: string;
    };
    mainOfficeCity: {
      ar: string;
      en: string;
    };
    publicSecurityLicense: string;
    telephone: string;
    mobile: string;
    email: string;
    nationalAddress: {
      city: {
        ar: string;
        en: string;
      };
      postalCode: string;
      unitNumber: string;
      buildingNumber: string;
    };
    representativeName: {
      ar: string;
      en: string;
    };
    representativeTitle: {
      ar: string;
      en: string;
    };
    commercialRegistration: string;
    registrationInSabl: string;
    guardsCount: number;
  };
  partyTwo: {
    name: {
      ar: string;
      en: string;
    };
    mainOfficeCity: {
      ar: string;
      en: string;
    };
    publicSecurityLicense: string;
    telephone: string;
    mobile: string;
    email: string;
    nationalAddress: {
      postalCode: string;
      unitNumber: string;
      buildingNumber: string;
      city: {
        ar: string;
        en: string;
      };
    };
    representativeName: {
      ar: string;
      en: string;
    };
    representativeTitle: {
      ar: string;
      en: string;
    };
    commercialRegistrationCity: {
      ar: string;
      en: string;
    };
    locationToBeSecured: {
      ar: string;
      en: string;
    };
  };
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
  customClauses: {
    ar: string;
    en: string;
  }[];
>>>>>>> 1f61da8 (create the services, models, form component)
}
