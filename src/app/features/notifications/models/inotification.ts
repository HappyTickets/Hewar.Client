import { NotificationEvents } from "../../../shared/enums/notification-events";

export interface INotification {
  id: number,
  contentAr:string
  contentEn: string,
  isRead: boolean,
  referenceId: number,
  referenceType: number,
  event: NotificationEvents,
  notifiedOn: Date
}
