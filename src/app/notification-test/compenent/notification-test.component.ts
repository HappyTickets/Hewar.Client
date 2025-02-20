import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificationDto } from '../models/notification.model';

@Component({
  selector: 'app-notification-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-test.component.html',
})
export class NotificationTestComponent implements OnInit, OnDestroy {
  notifications: NotificationDto[] = [];
  isConnected = false;
  private subscriptions: Subscription[] = [];
  private notificationCallback!: (notif: NotificationDto) => void; // Store the callback reference

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to connection state updates
    this.subscriptions.push(
      this.notificationService.connectionState$.subscribe(
        state => (this.isConnected = state)
      )
    );

    this.notificationCallback = (notif: NotificationDto) => {
      this.notifications.push(notif);
    };

    this.notificationService.subscribeNotificationReceived(this.notificationCallback);

    this.notificationService.enableNotificationListener();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());

    if (this.notificationCallback) {
      this.notificationService.unsubscribeNotificationReceived(this.notificationCallback);
    }
  }
}
