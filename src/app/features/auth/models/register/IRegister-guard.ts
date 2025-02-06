import { IAddress } from './iaddress';

export interface IRegisterGuard {
  userName: string;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  dateOfBirth: Date;
  nationalId: string;
  qualification: number;
  city: number;
  address: IAddress;
  bloodType: number;
  height: number;
  weight: number;
  skills: ISkill[];
  prevCompanies: IPrevCompany[];
}
export interface ISkill {
  name: string;
  yearsOfExperience: number;
}

export interface IPrevCompany {
  name: string;
  from: Date;
  to: Date;
}
