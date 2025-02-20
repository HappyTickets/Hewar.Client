import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './../../features/auth/services/auth.service';
import { IApiResponse } from '../../shared/models/IApiResponse';
import { NotificationDto } from '../models/notification.model';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection!: HubConnection;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private connectionStateSubject = new BehaviorSubject<boolean>(false); 

  unreadCount$ = this.unreadCountSubject.asObservable();
  connectionState$ = this.connectionStateSubject.asObservable(); // Expose connection state

  private onUnreadCountSubscribers: Array<(count: number) => void> = [];
  private onNotificationReceivedSubscribers: Array<(notif: NotificationDto) => void> = [];
  private onNotificationReadSubscribers: Array<(id: number) => void> = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all notifications
  getAllNotifications(): Observable<IApiResponse<NotificationDto[]>> {
    if (this.authService.isLoggedIn()) {
      return this.http.get<IApiResponse<NotificationDto[]>>(`/api/notifications/getAll`);
    } else {
      throw new Error('User is not logged in.');
    }
  }

  // Get the count of unread notifications
  getUnreadNotificationsCount(): Observable<IApiResponse<number>> {
    if (this.authService.isLoggedIn()) {
      return this.http.get<IApiResponse<number>>(`/api/notifications/countUnRead`);
    } else {
      throw new Error('User is not logged in.');
    }
  }

  // Mark a notification as read
  markNotificationAsRead(id: number): Observable<IApiResponse<null>> {
    if (this.authService.isLoggedIn()) {
      return this.http.patch<IApiResponse<null>>(`/api/notifications/markAsRead/${id}`, {});
    } else {
      throw new Error('User is not logged in.');
    }
  }

  subscribeUnreadCount(callback: (count: number) => void): void {
    this.onUnreadCountSubscribers.push(callback);
  }

  subscribeNotificationReceived(callback: (notif: NotificationDto) => void): void {
    this.onNotificationReceivedSubscribers.push(callback);
  }

  subscribeNotificationRead(callback: (id: number) => void): void {
    this.onNotificationReadSubscribers.push(callback);
  }

  unsubscribeUnreadCount(callback: (count: number) => void): void {
    this.onUnreadCountSubscribers = this.onUnreadCountSubscribers.filter(sub => sub !== callback);
  }

  unsubscribeNotificationReceived(callback: (notif: NotificationDto) => void): void {
    this.onNotificationReceivedSubscribers = this.onNotificationReceivedSubscribers.filter(sub => sub !== callback);
  }

  unsubscribeNotificationRead(callback: (id: number) => void): void {
    this.onNotificationReadSubscribers = this.onNotificationReadSubscribers.filter(sub => sub !== callback);
  }

  private initializeSignalRConnection(): void {
    if (!this.authService.isLoggedIn()) return;
    
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://188.138.101.4:6852/hubs/notifications', {
        accessTokenFactory: async () => {
          const token = this.authService.getAccessToken();
          return token ?? '';
        },
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('ReceiveNotification', (notification: NotificationDto) => {
      this.onNotificationReceivedSubscribers.forEach(callback => callback(notification));
      this.unreadCountSubject.next(this.unreadCountSubject.getValue() + 1);
      this.onUnreadCountSubscribers.forEach(callback => callback(this.unreadCountSubject.getValue()));
    });

    this.hubConnection.on('MarkNotificationAsReadAsync', (notificationId: number) => {
      this.onNotificationReadSubscribers.forEach(callback => callback(notificationId));
      this.unreadCountSubject.next(Math.max(0, this.unreadCountSubject.getValue() - 1));
      this.onUnreadCountSubscribers.forEach(callback => callback(this.unreadCountSubject.getValue()));
    });

    this.hubConnection
      .start()
      .then(() => {
        this.connectionStateSubject.next(true);
        console.log('SignalR Connected');
      })
      .catch(err => {
        this.connectionStateSubject.next(false);
        console.error('Error connecting to SignalR:', err);
      });

    this.hubConnection.onreconnecting(() => this.connectionStateSubject.next(false));
    this.hubConnection.onreconnected(() => this.connectionStateSubject.next(true));
    this.hubConnection.onclose(() => this.connectionStateSubject.next(false));
  }

  enableNotificationListener(): boolean {
    if (!this.hubConnection) {
      this.initializeSignalRConnection();
      return true;
    } else if (this.hubConnection.state === HubConnectionState.Disconnected) {
      this.hubConnection
        .start()
        .then(() => {
          this.connectionStateSubject.next(true);
          console.log('SignalR Reconnected');
        })
        .catch(err => {
          console.error('Error reconnecting SignalR:', err);
          return false;
        });

      return true;
    }

    return false;
  }

  disableNotificationListener(): void {
    if (this.hubConnection && this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection
        .stop()
        .then(() => {
          this.connectionStateSubject.next(false);
        })
        .catch(err => console.error('Error stopping SignalR:', err));
    }
  }
}
