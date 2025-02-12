import { IAddress } from '../../auth/models/register/iaddress';

export interface IEditSecurityCertificate {
  id?: number;
  startDate: string;
  endDate: string;
  siteArea: number;
  agreedNumberOfSecurityGuards: number;
  numberOfCameras: number;
  hasCentralMonitoringRoom: boolean;
  contractDocumentUrl: string;
  address: IAddress;
}
