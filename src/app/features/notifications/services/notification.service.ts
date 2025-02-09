import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';
import { IResponse } from '../../../core/models/IResponse';
import { INotification } from '../models/inotification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all notifications for the user
  getAllNotifications(): Observable<IResponse<INotification[]>> {
    if (this.authService.isLoggedIn()) {
      return this.http
        .get<IResponse<INotification[]>>(`/api/notifications/getAll`)
        .pipe();
    } else {
      throw new Error('User is not logged in.');
    }
  }

  // Get the count of unread notifications
  getUnreadNotificationsCount(): Observable<IResponse<number>> {
    if (this.authService.isLoggedIn()) {
      return this.http.get<IResponse<number>>(`/api/notifications/countUnRead`);
    } else {
      throw new Error('User is not logged in.');
    }
  }

  // Mark a notification as read
  markNotificationAsRead(id: number): Observable<IResponse<null>> {
    if (this.authService.isLoggedIn()) {
      return this.http.patch<IResponse<null>>(
        `/api/notifications/markAsRead/${id}`,
        {}
      );
    } else {
      throw new Error('User is not logged in.');
    }
  }
}
