export interface ICreateFacilities {
  type: string;
  name: string;
  commercialRegistration: string;
  activityType: string;
  responsibleName: string;
  responsiblePhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  adminInfo: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    imageUrl: string;
  };
}

export interface ICreateFacilityResponse {}
