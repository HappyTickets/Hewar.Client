import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { authRoutes } from '../routes/enum';
import { IRegisterFacility } from '../models/register/iregister-facility';
import { IRegisterCompany } from '../models/register/iregister-company';
import { IRegisterGuard } from '../models/register/IRegister-guard';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { ILogin, ILoginResponse } from '../models/ilogin';
import { StorageService } from './storage.service';
import { PermissionService } from './permission.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private permissionService = inject(PermissionService);
  private storageService = inject(StorageService);
  private http = inject(HttpClient);

  // <== == == == == == == == Register == == == == == == == ==>
  registerGuard(guard: IRegisterGuard): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(authRoutes.registerGuard, guard);
  }
  registerFacility(facility: IRegisterFacility): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(authRoutes.registerFacility,facility);
  }
  registerCompany(company: IRegisterCompany): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(authRoutes.registerCompany,company);
  }
  // <== == == == == == == == Login & Logout == == == == == == == ==>
  login(loginData: ILogin): Observable<IApiResponse<ILoginResponse>> {
    return this.http.post<IApiResponse<ILoginResponse>>(authRoutes.login, loginData).pipe(
      tap((res) => {
        if (res.data) {
          this.storageService.storeResponse(res.data);
          this.permissionService.setPermissions(res.data.permissions);
        } else throw new Error('Response data is null');
      })
    );
  }
  logout(): void {
    this.storageService.clearTokens();
  }
  refreshToken(): Observable<IApiResponse<ILoginResponse>> {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      this.logout();
      throw new Error('Refresh token is missing');
    }
    return this.http.post<IApiResponse<ILoginResponse>>(authRoutes.refreshToken,{ accessToken }).pipe(
      tap((res) => {
        if (res.data) {
          this.storageService.storeResponse(res.data);
          this.permissionService.setPermissions(res.data.permissions);
        } else throw new Error('Response data is null');
      })
    );
  }
  // <== == == == == == == == Helpers == == == == == == == ==>
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }
  getAccessToken(): string | null {
    return this.getCookie('accessToken');
  }
  isLoggedIn(): boolean {
    const token = this.getCookie('accessToken');
    return !!token;
  }
}
