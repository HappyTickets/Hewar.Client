export interface IAssignUsersToRole {
  roleId: number; // ID of the role to assign users to
  userIds: number[]; // Array of user IDs to assign to the role
}
