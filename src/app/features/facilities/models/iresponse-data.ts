import { IAddress } from '../../auth/models/register/iaddress';

export interface IResponseData {
  id: number;
  type: string;
  name: string;
  commercialRegistration: string;
  activityType: string;
  responsibleName: string;
  responsiblePhone: string;
  logo: string;
  address: IAddress;
}

export interface IGetFacilityResponse {
  status: number; // Example: 200
  isSuccess: boolean;
  successCode: number; // Example: 802
  data: IResponseData[]; // The actual facility data
}
