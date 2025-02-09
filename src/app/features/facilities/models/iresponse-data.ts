export interface IResponseData {
  id: number;
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

export interface IGetFacilityResponse {
  status: number; // Example: 200
  isSuccess: boolean;
  successCode: number; // Example: 802
  data: IResponseData[]; // The actual facility data
}
