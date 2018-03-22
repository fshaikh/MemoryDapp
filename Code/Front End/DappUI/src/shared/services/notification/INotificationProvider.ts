import { NotificationMessage } from "../../Models/Notification/NotificationMessage";

/**
 * Interface for Notification functionality
 */
export interface INotificationProvider {
    showNotification(message: NotificationMessage);
    supportsNotification(): boolean;
}