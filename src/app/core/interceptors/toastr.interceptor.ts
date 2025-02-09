import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { IResponse } from '../models/IResponse';
import { LocalizationService } from '../services/localization/localization.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const toastrInterceptor: HttpInterceptorFn = (req, next) => {
  const localizationService = inject(LocalizationService);
  const toastrService = inject(ToastrService);
  return next(req).pipe(
    tap(event => {
      const res = event as HttpResponse<IResponse<unknown>>;
      if(res.body?.isSuccess && res.body?.successCode) {
        const successCode = res.body.successCode;
        const message = localizationService.translateSuccessCode(successCode);
        toastrService.success(message);
      }
   }),
   catchError(err => {
     const error = err.error as IResponse<unknown>;
     if(!error.isSuccess) {
       const errorCode = error.errorCode;
       const message = localizationService.translateErrorCode(errorCode);
       toastrService.error(message);
     }
     return throwError(() => err);
   })
);
};
