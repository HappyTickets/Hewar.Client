import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { NotificationDto } from '../../../notification-test/models/notification.model';
import { NotificationService } from '../../../notification-test/services/notification.service';
import { PopoverModule } from 'primeng/popover';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    BadgeModule,
    ButtonModule,
    OverlayPanelModule,
    PopoverModule,
    DialogModule,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  @ViewChild('op') overlayPanel!: OverlayPanel;
  notifications: NotificationDto[] = [];
  unreadCount = 5;
  popoverVisible = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.subscribeNotificationReceived(
      (notif: NotificationDto) => {
        this.notifications.unshift(notif);

        this.unreadCount++; // Increment the unread count dynamically
      }
    );

    // Fetch initial unread count (optional)
    this.notificationService
      .getUnreadNotificationsCount()
      .subscribe((response) => {
        this.unreadCount = response.data ?? 5;
      });
    console.log(this.unreadCount);
  }

  markAsRead() {
    this.unreadCount = 0; // Reset the unread count
  }

  togglePanel(event: Event) {
    this.overlayPanel.toggle(event);
    this.popoverVisible = !this.popoverVisible;
  }
}
