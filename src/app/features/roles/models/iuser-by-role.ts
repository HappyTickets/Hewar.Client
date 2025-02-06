export interface IUserByRole {}

export interface IAssignedUser {
  id: number;
  userName: string | null;
  email: string;
  phoneNumber: string;
}

export interface IAssignedUsers {
  items: IAssignedUser[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IRoleUsersResponse {
  status: number;
  isSuccess: boolean;
  errorCode: number;
  successCode: number;
  data: {
    roleId: number;
    roleName: string;
    description: string | null;
    assignedUsers: IAssignedUsers;
  };
}
