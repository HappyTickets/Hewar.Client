import { Permissions } from '../../../shared/enums/permissions';
export interface IRoleCreate {
  roleName: string;
  roleDescription: string;
  permissions: Permissions[];
}
