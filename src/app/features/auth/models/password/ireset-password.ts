export interface IResetPassword {
  token: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}
