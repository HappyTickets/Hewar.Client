import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();

  // Clone the request and add the access token to the headers
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Handle the request and catch 401 errors
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next, authService, router);
      } else {
        return throwError(() => error);
      }
    })
  );
};

// Helper function to handle 401 errors
const handle401Error = ( req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService, router: Router): Observable<HttpEvent<unknown>> => {
    if (!authService.isRefreshing) {
    authService.isRefreshing = true;

    // Attempt to refresh the access token
    return authService.refreshToken().pipe(
      switchMap((res) => {
        authService.isRefreshing = false;
        if (res.data) {
          authService.storeResponse(res.data);
          const newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
          });
          return next(newRequest);
        } else {
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => new Error('Failed to refresh token'));
        }
      }),
      catchError((error) => {
        authService.isRefreshing = false;
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
