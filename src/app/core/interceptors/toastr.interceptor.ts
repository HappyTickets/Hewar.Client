import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { LocalizationService } from '../services/localization/localization.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../shared/models/IApiResponse';

export const toastrInterceptor: HttpInterceptorFn = (req, next) => {
  const localizationService = inject(LocalizationService);
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    tap(event => {
      const res = event as HttpResponse<IApiResponse<unknown>>;
      if(res.body?.isSuccess && res.body?.successCode) {
        const successCode = res.body.successCode;
        const message = localizationService.translateSuccessCode(successCode);
        toastrService.success(message);
      }
   }),
   catchError(err => {
     const error = err.error as IApiResponse<unknown>;
     if(error && !error.isSuccess) {
      const message = localizationService.translateErrorCode(error.errorCode);
      toastrService.error(message);
      if(error.errors &&error.errors.length > 0) {
        for (err of error.errors) {
          toastrService.error(err);
        }
      }
     }
     return throwError(() => err);
   })
  );
};
