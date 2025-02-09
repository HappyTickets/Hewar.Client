import { Permissions } from '../../../shared/enums/permissions';

export interface IRole {
  id: number;
  roleName: string;
  roleDescription: string;
  permissions: Permissions;
}
