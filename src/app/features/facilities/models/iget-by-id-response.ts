export interface IgetByIdResponse {
  id: number;
  type: string;
  name: string;
  commercialRegistration: string;
  activityType: string;
  responsibleName: string;
  responsiblePhone: string;
  logo: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}
