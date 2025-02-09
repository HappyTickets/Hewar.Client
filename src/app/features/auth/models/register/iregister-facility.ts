import { IAddress } from './iaddress';
import { IAdminInfo } from './iadmin-info';

export interface IRegisterFacility {
  type: string;
  name: string;
  commercialRegistration: string;
  activityType: string;
  responsibleName: string;
  responsiblePhone: string;
  logo: string;
  address: IAddress;
  adminInfo: IAdminInfo;
}
