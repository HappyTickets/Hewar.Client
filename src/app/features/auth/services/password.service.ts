import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/IApiResponse';
import { IChangePassword } from '../models/password/ichange-password';
import { IResetPassword } from '../models/password/ireset-password';
import { passwordRoutes } from '../routes/enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private http = inject(HttpClient);

  resetPassword(request: IResetPassword): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(passwordRoutes.reset, request);
  }
  changePassword(request: IChangePassword): Observable<IApiResponse<null>> {
    return this.http.patch<IApiResponse<null>>(passwordRoutes.change, request);
  }
  createResetPassword(email: string): Observable<IApiResponse<null>> {
    return this.http.post<IApiResponse<null>>(passwordRoutes.createResetPassword,{ email });
  }
}
