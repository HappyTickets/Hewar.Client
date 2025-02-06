import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://188.138.101.4:6852'; // Make sure the baseUrl includes the protocol
  const token = localStorage.getItem('token');

  // Prepend baseUrl only if the URL is relative
  const newRequest = req.clone({
    url: baseUrl + req.url,
    setHeaders: {
      Authorization: token ? 'Bearer' + token : '',
    },
  });
  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      return throwError(() => error);
    })
  );
};
