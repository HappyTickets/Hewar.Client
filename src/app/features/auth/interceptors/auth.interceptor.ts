import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      const token = authService.getAccessToken();
      if (token) {
        authService.refreshToken().subscribe(res => {
          if (res.data && res.isSuccess) {
            const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.data.accessToken}` }});
            return next(newReq);
          } else {
            authService.logout();
            return throwError(() => error);
          }
        })
      }
    }
    return throwError(() => error);
  }))
};
