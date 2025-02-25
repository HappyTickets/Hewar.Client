import { PermissionService } from './../../features/auth/services/permission.service';
import { StorageService } from './../../features/auth/services/storage.service';
import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  if (accessToken) req = req.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}});
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next, authService, storageService, permissionService, router);
      } else {
        return throwError(() => error);
      }
    })
  );
};

// Helper function to handle 401 errors
const handle401Error = ( req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService, storageService: StorageService, permissionService:PermissionService , router: Router): Observable<HttpEvent<unknown>> => {
    if (!storageService.checkAccessTokenExpiry()) {
      const authService = inject(AuthService);
      const storageService = inject(StorageService);
      const permissionService = inject(PermissionService);
    return authService.refreshToken().pipe(
      switchMap((res) => {
        if (res.data) {
          storageService.storeResponse(res.data);
          permissionService.setPermissions(res.data.permissions);
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
      retry(2),
      catchError((error) => {
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
