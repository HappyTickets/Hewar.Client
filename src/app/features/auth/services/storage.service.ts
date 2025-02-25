import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IDecodedToken } from '../models/idecoded-token';
import { ILoginResponse } from '../models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // <== == == == == == == == Token == == == == == == == ==>
  checkAccessTokenExpiry(): boolean {
    const accessTokenExpDate = this.getUserInfo()?.accessTokenExpDate;
    if (!accessTokenExpDate) throw new Error('Access token expiration date is missing');
    const expirationDate = new Date(accessTokenExpDate).getTime();
    return expirationDate > Date.now();
  }
  storeResponse(data: ILoginResponse): void {
    document.cookie = `accessToken=${data.accessToken}; path=/;`;
    localStorage.setItem('userInfo', JSON.stringify({
      userId: data.userId,
      firstName: data.firstName,
      accessTokenExpDate: data.accessTokenExpDate,
    }));
  }
  getAccessToken(): string | null {
    return this.getCookie('accessToken');
  }
  clearTokens(): void {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'permissions=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('userInfo');
  }
  // <== == == == == == == == Helpers == == == == == == == ==>
  getUserInfo(): ILoginResponse | null {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken: IDecodedToken = jwtDecode(token);
      if (decodedToken.EntityType === "Company") return "Company";
      if (decodedToken.EntityType === "Facility") return "Facility";
      return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    }
    return null;
  }
  getId(): string | null {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken: IDecodedToken = jwtDecode(token);
      return decodedToken.EntityId;
    }
    return null;
  }
  isSuperAdmin(): boolean {
    return this.getUserRole() === 'SuperAdmin';
  }
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
}
