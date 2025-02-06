import { IAddress } from '../../auth/models/register/iaddress';

export interface ICompany {
  id: number;
  contactEmail: string;
  phone: string;
  name: string;
  imageUrl: string;
  address: IAddress;
}
