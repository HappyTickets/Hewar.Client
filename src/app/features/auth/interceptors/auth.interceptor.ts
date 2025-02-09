import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      console.log('hi from auth 401');
      authService.refreshToken().subscribe(res => {
        console.log('hi from auth service');

        if (res.data && res.isSuccess) {
          console.log('hi from auth service if statement');
          const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.data.accessToken}` }});
          return next(newReq);
        } else {
          authService.logout();
          return throwError(() => error);
        }

      })
    }
    return throwError(() => error);
  }))
};
