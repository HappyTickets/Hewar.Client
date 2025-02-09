import { IAddress } from './iaddress';
import { IAdminInfo } from './iadmin-info';

export interface IRegisterCompany {
  contactEmail: string;
  phoneNumber: string;
  registrationNumber: string;
  taxId: string;
  name: string;
  logo: string;
  adminInfo: IAdminInfo;
  address: IAddress;
}
