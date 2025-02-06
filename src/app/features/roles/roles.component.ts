import { Component, OnInit } from '@angular/core';
import { RoleService } from './services/role.service';
import { IRoleCreate } from './models/irole-create';
import { Permissions } from '../../shared/enums/permissions';
import { IRoleUpdate } from './models/irole-update';
import { IAssignUsersToRole } from './models/iassign-users-to-role';
import { IAssignRolesToUser } from './models/iassign-roles-to-user';
import { IUnassignUsersFromRole } from './models/iunassign-users-from-role';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  assignPayload: IAssignUsersToRole = {
    roleId: 1,
    userIds: [1, 4],
  };
  assignPayload2: IAssignRolesToUser = {
    roles: ['gaurd'],
    userId: 2,
  };
  payload: IUnassignUsersFromRole = {
    roleId: 1, // Replace with actual role ID
    userIds: [1, 2], // Replace with actual user IDs
  };
  constructor(private RolesService: RoleService) {}
  ngOnInit(): void {
    // this.UpdatRole();
    // this.deleteRole(14);
    // this.getallRoles();
    // this.getByID();
    // this.unassignusers();
    this.getUsersWithRoles();
  }

  creatRole(): void {
    const NewRole: IRoleCreate = {
      roleName: 'Guarddddddddf',
      roleDescription: 'Responsible for managing guard dutiesddddddddddd',
      permissions: [Permissions.CreateCompany, Permissions.CreateGuard],
    };
    // // console.log(NewRole);
    this.RolesService.createRole(NewRole).subscribe({
      next: (res) => {
        console.log('Role created successfully!', res.errorCode, res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  UpdatRole() {
    const roleUpdate: IRoleUpdate = {
      roleId: 15,
      roleName: 'Guard',
      roleDescription: 'Oversees and manages.',
      permissions: [Permissions.DeleteCompany, Permissions.CreateGuard], // Array of permissions
    };
    // // console.log(roleUpdate);

    // Sending the updated role to the API
    this.RolesService.updateRole(roleUpdate).subscribe({
      next: (res) => {
        console.log('Role updated successfully!', res.errorCode, res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  deleteRole(roleId: number) {
    this.RolesService.deleteRole(roleId).subscribe({
      next: (res) => {
        console.log('Role deleted successfully!', res.errorCode, res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  getallRoles() {
    this.RolesService.getRoles().subscribe({
      next: (res) => {
        console.log('All roles:', res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  getByID() {
    this.RolesService.getRoleById(100).subscribe({
      next: (res) => {
        console.log('Role by ID:', res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  assignusers() {
    this.RolesService.assignUsersToRole(this.assignPayload).subscribe({
      next: (res) => {
        console.log('Users assigned successfully!', res.errorCode, res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  assignroles() {
    this.RolesService.assignRolesToUser(this.assignPayload2).subscribe({
      next: (res) => {
        console.log('Roles assigned successfully!', res.errorCode, res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  unassignusers() {
    this.RolesService.unassignUsersFromRole(this.payload).subscribe({
      next: (res) => {
        console.log('Users unassigned successfully!', res.errorCode, res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  getUserRoles() {
    this.RolesService.getAssignedRolesByUserId(3).subscribe({
      next: (res) => {
        console.log('User Roles:', res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  getUsersByRoleId() {
    this.RolesService.getAssignedUsersToRole(3).subscribe({
      next: (res) => {
        console.log('Users by Role:', res.data.assignedUsers.items);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
  getUsersWithRoles() {
    const paginationOff = true; // Optional
    const isDescending = true; // Optional
    const pageIndex = 1; // Optional
    const pageSize = 10; // Optional

    this.RolesService.getUsersWithRoles(
      pageIndex,
      pageSize,
      paginationOff,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      isDescending
    ).subscribe({
      next: (res) => {
        console.log('Users with Roles:', res.data);
      },
      error: (err) => {
        console.log(err.error.errorCode);
      },
    });
  }
}
