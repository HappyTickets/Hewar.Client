import { IAddress } from "../../auth/models/register/iaddress";

export interface ICompany {
  id: number;
  contactEmail: string;
  phoneNumber: string;
  registrationNumber: string;
  taxId: string;
  name: string;
  logo: string;
  address: IAddress
}
