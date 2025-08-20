import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReservationService } from '../../../core/services/reservation.service';
import { ClassService } from '../../../core/services/class.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private classService = inject(ClassService);
  private notificationService = inject(NotificationService);
  private reservationService = inject(ReservationService);
  private router = inject(Router);

  // Signals que contienen estado
  classes = signal<any[]>([]);
  notifications = signal<any[]>([]);

  ngOnInit() {
    this.classes.set(this.classService.getClasses());
    this.notifications.set(this.notificationService.getNotifications());
  }

  reservarClase(c: any) {
    this.reservationService.addReservation({
      id: c.id,
      name: c.name,
      date: c.schedule,
      location: c.location,
    });

    alert(`Clase ${c.name} reservada ✅`);
    this.router.navigate(['/reservations']);
  }
}
