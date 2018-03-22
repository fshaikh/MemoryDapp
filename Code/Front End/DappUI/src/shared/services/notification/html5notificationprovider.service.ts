import { NotificationMessage } from '../../Models/Notification/NotificationMessage';
import { Injectable } from '@angular/core';
import { INotificationProvider } from './INotificationProvider';
declare var Notification: any;
/**
 * Provides app notification functionality
 */
@Injectable()
export class HTML5NotificationProvider implements INotificationProvider {

    constructor() {

    }

    public showNotification(notificationMessage: NotificationMessage) {
        if (Notification.permission === 'granted') {
            // Create a notification
            this.spawnNotification(notificationMessage);
        }else{
            Notification.requestPermission((permission) => {
                // Create a notification
                this.spawnNotification(notificationMessage);
            });
        }
    }

    public supportsNotification() {
        return ('Notification' in window || Notification.permission === 'denied');
    }

    private spawnNotification(notificationMessage: NotificationMessage) {
        var options: any = {
            body: notificationMessage.message,
            icon: notificationMessage.icon
        };
        var notification = new Notification(notificationMessage.title, 
                                            options);
    }
}