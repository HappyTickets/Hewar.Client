
import { Permissions } from '../../../shared/enums/permissions';

export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginResponse {
  firstName: string;
  userId: number;
  email: string;
  imageUrl: string;
  permissions: Permissions[];
  accessToken: string;
  accessTokenExpDate: Date;
}
