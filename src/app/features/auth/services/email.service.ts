import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IConfirmEmail } from '../models/iconfirm-email';
import { emailRoutes } from '../routes/enum';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);

  sendConfirmationEmail(email: string): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(emailRoutes.sendConfirmation, {email});
  }
  confirmEmail(request: IConfirmEmail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(emailRoutes.confirm, request);
  }
  confirmEmailChange(request: IConfirmEmail): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(emailRoutes.confirmChange,request);
  }
}
