import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { ILoginResponse } from '../models/ilogin';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  // const token = getCookie('accessToken');
  const token = localStorage.getItem('accessToken');
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  // handle 401 error
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      const accessToken = authService.getAccessToken();
      if (accessToken) {
        if (!authService.checkAccessTokenExpiry()) {
          authService.logout();
          return throwError(() => new Error('Access token has expired.'));
        }
        return authService.refreshToken().pipe(switchMap((res: IApiResponse<ILoginResponse>) => {
          if (res.data && res.isSuccess) {
            const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.data.accessToken}` }});
            return next(newReq);
          } else {
            authService.logout();
            return throwError(() => error);
          }
        }))
      }
    }
    return throwError(() => error);
  }))
};

// get the cookie
// function getCookie(name: string): string | null {
//   const cookies = document.cookie.split(';');
//   for (const cookie of cookies) {
//     const [key, value] = cookie.trim().split('=');
//     if (key === name) {
//       return value;
//     }
//   }
//   return null;
// }
