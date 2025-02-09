import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://188.138.101.4:6852';
  const authServie = inject(AuthService);
  const token = authServie.getAccessToken();

  const newRequest = req.clone({
    url: baseUrl + req.url,
    setHeaders: { Authorization: token ? `Bearer ${token}` : '' },
  });

  return next(newRequest);
};
