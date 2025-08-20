import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = [
    { id: 1, message: '¡Promo! 20% de descuento en Yoga este mes 🧘' },
    { id: 2, message: 'Nueva sede abierta en el Norte 🚀' },
  ];

  getNotifications() {
    return this.notifications;
  }
}
