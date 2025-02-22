import { Component } from '@angular/core';
import { NotificationDto } from '../../../notification-test/models/notification.model';

import { Subscription } from 'rxjs';
import { NotificationService } from '../../../notification-test/services/notification.service';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-notification-icon',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './notification-icon.component.html',
  styleUrl: './notification-icon.component.scss',
})
export class NotificationIconComponent {
  showNotifications = false;
  notifications: NotificationDto[] = [];
  unreadCount = 0;
  private subscriptions: Subscription[] = [];
  visible: boolean = false;

  position: string = 'center';

  constructor(private notificationService: NotificationService) {}
  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  ngOnInit(): void {
    // تفعيل SignalR
    this.notificationService.enableNotificationListener();

    // الاشتراك في عدد الإشعارات غير المقروءة
    this.subscriptions.push(
      this.notificationService.unreadCount$.subscribe((count) => {
        this.unreadCount = count;
      })
    );

    // الاشتراك في قائمة الإشعارات
    this.subscriptions.push(
      this.notificationService.getAllNotifications().subscribe((response) => {
        this.notifications = response.data ?? [];
      })
    );

    // الاشتراك في استلام إشعار جديد
    this.notificationService.subscribeNotificationReceived(
      (notif: NotificationDto) => {
        this.notifications.unshift(notif);
        this.unreadCount++;
      }
    );

    // تحديث عدد الإشعارات عند قراءتها
    this.notificationService.subscribeNotificationRead((id: number) => {
      this.notifications = this.notifications.filter((n) => n.id !== id);
      this.unreadCount = Math.max(0, this.unreadCount - 1);
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(notificationId: number): void {
    this.notificationService
      .markNotificationAsRead(notificationId)
      .subscribe(() => {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notificationId
        );
        this.notificationService
          .getUnreadNotificationsCount()
          .subscribe((response) => {
            this.unreadCount = response.data ?? 0;
          });
      });
  }
}
