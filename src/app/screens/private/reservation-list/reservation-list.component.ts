import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '@core//services/reservation.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HeaderComponent],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent {
  reservationService = inject(ReservationService);

  cancel(id: string) {
    this.reservationService.cancelReservation(id);
  }

  openMap(mapUrl: string) {
    window.open(mapUrl, '_blank');
  }
}
