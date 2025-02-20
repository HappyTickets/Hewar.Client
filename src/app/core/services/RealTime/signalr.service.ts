import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationDto } from '../../../notification-test/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private connectionState = new BehaviorSubject<boolean>(false);
  connectionState$ = this.connectionState.asObservable();

  private notifications = new BehaviorSubject<NotificationDto | null>(null);
  notifications$ = this.notifications.asObservable();

  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.startConnection();
  }

  private startConnection(): void {
    const token = this.authService.getAccessToken();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7014/hubs/notifications', {
        accessTokenFactory: () => token ?? '',
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
        this.connectionState.next(true);
      })
      .catch((err) => console.error('SignalR Connection Error:', err));

    this.hubConnection.onreconnecting(() => this.connectionState.next(false));
    this.hubConnection.onreconnected(() => this.connectionState.next(true));

    this.setupListeners();
  }

  private setupListeners(): void {
    this.hubConnection.on('ReceiveNotification', (notification:NotificationDto) => {
      console.log('New Notification:', notification);
      this.notifications.next(notification);

      // Show Toastr Notification
      this.toastr.info(
        notification.contentAr, // Show English content
        'New Notification', // Title
        { timeOut: 5000, positionClass: 'toast-top-right' }
      );
      
    });

    this.hubConnection.on('MarkNotificationAsRead', (notificationId) => {
      console.log('Notification Read:', notificationId);
    });
  }

  disconnect(): void {
    this.hubConnection.stop();
  }
}
