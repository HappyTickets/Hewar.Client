import { NotificationEvents } from "../../shared/enums/notification-events";
import { ReferenceTypes } from "../../shared/enums/reference-types";

export interface NotificationDto {
    id: number;
    contentAr: string;
    contentEn: string;
    isRead: boolean;
    referenceId: number;
    referenceType: ReferenceTypes;
    event: NotificationEvents;
    notifiedOn: Date; 
}
  