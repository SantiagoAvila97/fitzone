import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  Reservation,
  ReservationService,
} from '@core//services/reservation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import {
  ModalsService,
  ModalType,
  SnackbarType,
} from '@shared/services/modals.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent {
  // Injects
  reservationService = inject(ReservationService);
  private modalsService = inject(ModalsService);

  cancel(reserve: Reservation) {
    const dialogRef = this.modalsService.openConfirmationModal({
      type: ModalType.ERROR,
      title: 'Confirmar reserva',
      body: `¿Deseas confirmar tu reserva para la clase seleccionada?
      Recuerda que esta acción garantiza tu cupo en la sesión y no se podrá modificar una vez confirmada. ${reserve.name} ${reserve.location} ${reserve.address}`,
      buttonLeft: 'Cancelar',
      buttonRight: 'Confirmar',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'right') return;

      this.reservationService.cancelReservation(reserve.id);
      this.modalsService.openSnackbar(
        SnackbarType.SUCCESS,
        'Cancelación exitosa',
      );
    });
  }

  openMap(mapUrl: string) {
    window.open(mapUrl, '_blank');
  }
}
