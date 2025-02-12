import { SecurityCertificateStatus } from "../../../shared/enums/security-certificate-status";
import { IAddress } from "../../auth/models/register/iaddress";

export interface ISecurityCertificate {
  id: number;
  facilityId: number;
  startDate: string;
  endDate: string;
  siteArea: number;
  agreedNumberOfSecurityGuards: number;
  numberOfCameras: number;
  hasCentralMonitoringRoom: boolean;
  contractDocumentUrl: string;
  isValid: boolean;
  facilityName: string;
  address: IAddress
  status: SecurityCertificateStatus;

  showActions?: boolean;
}
