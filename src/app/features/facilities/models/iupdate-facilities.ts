export interface IUpdateFacilities {
  id: number; // Facility ID to update
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
}
export interface IUpdateResponseFacilities {}
