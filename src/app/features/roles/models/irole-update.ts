import { Permissions } from '../../../shared/enums/permissions';
export interface IRoleUpdate {
  roleId: number;
  roleName: string;
  roleDescription: string;
  permissions: Permissions[];
}
