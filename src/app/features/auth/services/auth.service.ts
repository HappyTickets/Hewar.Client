import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { authRoutes, emailRoutes, passwordRoutes } from '../routes/enum';
import { IRegisterFacility } from '../models/register/iregister-facility';
import { IRegisterCompany } from '../models/register/iregister-company';
import { IChangePassword } from '../models/password/ichange-password';
import { IResetPassword } from '../models/password/ireset-password';
import { IRegisterGuard } from '../models/register/IRegister-guard';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { ILogin, ILoginResponse } from '../models/ilogin';
import { IConfirmEmail } from '../models/iconfirm-email';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  registerGuard(guard: IRegisterGuard): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(authRoutes.registerGuard, guard);
  }

  registerFacility( facility: IRegisterFacility ): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>( authRoutes.registerFacility, facility);
  }

  registerCompany(company: IRegisterCompany): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>( authRoutes.registerCompany, company );
  }

  // <== == == == == == == == Login & Logout == == == == == == == ==>
  login(loginData: ILogin): Observable<IApiResponse<ILoginResponse>> {
    return this.http.post<IApiResponse<ILoginResponse>>(authRoutes.login, loginData).pipe(
      tap((res) => {
        if (res.data) {
          this.storeResponse(res.data);
          console.log(res.data);

          this.router.navigate(['/home']);
        } else throw new Error('Response data is null');
      })
    )
  }

  logout(): void {
    this.clearTokens();
  }

  refreshToken(): Observable<IApiResponse<ILoginResponse>> {
    if (!this.checkAccessTokenExpiry()) {
      this.logout();
      throw new Error('Access token has expired. Please log in again.');
    }
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      this.logout();
      throw new Error('Refresh token is missing');
    }

    return this.http.post<IApiResponse<ILoginResponse>>(authRoutes.refreshToken, { accessToken } ).pipe(
      tap((res) => {
        if (res.data) this.storeResponse(res.data);
        else throw new Error('Response data is null');
      })
    )
  }

  // <== == == == == == == == Email == == == == == == == ==>
  sendConfirmationEmail(email: string): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(emailRoutes.sendConfirmation, { email });
  }

  confirmEmail(request: IConfirmEmail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(emailRoutes.confirm, request);
  }

  confirmEmailChange(request: IConfirmEmail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>( emailRoutes.confirmChange, request);
  }

  // <== == == == == == == == Password == == == == == == == ==>
  resetPassword(request: IResetPassword): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(passwordRoutes.reset, request);
  }

  changePassword(request: IChangePassword): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(passwordRoutes.change, request);
  }

  createResetPassword(email: string): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>( passwordRoutes.createResetPassword, { email });
  }

  checkAccessTokenExpiry(): boolean {
    const accessTokenExpDate = this.getUserInfo()?.accessTokenExpDate;

    if (!accessTokenExpDate) throw new Error('Access token expiration date is missing');

    const expirationDate = new Date(accessTokenExpDate).getTime();
    return expirationDate > Date.now();
  }

  storeResponse(data: ILoginResponse): void {
    localStorage.setItem('userInfo', JSON.stringify({
      firstName: data.firstName,
      permissions: data.permissions,
    }));
    localStorage.setItem('accessToken',data.accessToken)
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clearTokens(): void {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUserInfo(): ILoginResponse | null {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
