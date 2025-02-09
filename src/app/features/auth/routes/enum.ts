export enum authRoutes {
  registerGuard = '/api/Authentication/registerGuard',
  registerFacility = '/api/Authentication/registerFacility',
  registerCompany = '/api/Authentication/registerCompany',
  login = '/api/Authentication/login',
  logout = '/api/Authentication/logout',
  refreshToken = '/api/Authentication/refreshToken',
}
export enum emailRoutes {
  sendConfirmation = '/api/EmailConfirmation/send-confirmation',
  confirm = '/api/EmailConfirmation/confirm',
  confirmChange = '/api/EmailConfirmation/confirm-change',
}
export enum passwordRoutes {
  createResetPassword = '/api/password/create-reset-token',
  reset = '/api/password/reset',
  change = '/api/password/change',
}
