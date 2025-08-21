import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReservationService } from '../../../core/services/reservation.service';
import {
  Class,
  ClassService,
  Site,
} from '../../../core/services/class.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '@core//services/auth.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FooterComponent } from '@shared/components/footer/footer.component';
import {
  ModalsService,
  ModalType,
  SnackbarType,
} from '@shared/services/modals.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BannerComponent } from '@shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FooterComponent,
    BannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Injects
  private authService = inject(AuthService);
  private classService = inject(ClassService);
  private reservationService = inject(ReservationService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private modalsService = inject(ModalsService);

  // Signals
  classes = signal<Site[]>([]);
  selectedNames = signal<string[]>([]);
  selectedSites = signal<string[]>([]);

  /** Inicilizador */
  ngOnInit() {
    this.classes.set(
      this.classService.getClasses().map((site) => ({
        ...site,
        mapUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.google.com/maps?q=${site.lat},${site.lng}&hl=es;z=14&output=embed`,
        ),
      })),
    );
  }

  /** Filtrar clases */
  filteredClasses = computed(() => {
    const names = this.selectedNames();
    const sites = this.selectedSites();
    const reserved = this.reservationService.reservations();
    const isAuth = this.authService.isAuthenticated();

    return this.classes().map((site) => ({
      ...site,
      classes: site.classes.filter((c) => {
        /** Filtro por nombre de clase */
        const matchesName = names.length === 0 || names.includes(c.name);

        /** Filtro por sede */
        const matchesSite = sites.length === 0 || sites.includes(site.name);

        /** Si no está autenticado, no valida reservas */
        if (!isAuth) {
          return matchesName && matchesSite;
        }

        /** Si está autenticado, también valida reservas */
        const notReserved = !reserved.some(
          (r) => r.id === c.id && r.location === site.name,
        );

        return matchesName && matchesSite && notReserved;
      }),
    }));
  });

  /** Maneja la reserva de una nueva clase */
  reserveClass(site: Site, information: Class) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      this.modalsService.openSnackbar(
        SnackbarType.INFORMATION,
        'Debes iniciar sesión para reservar',
      );
      return;
    }

    const { id, name, schedule } = information;
    const { address, lat, lng } = site;

    const dialogRef = this.modalsService.openConfirmationModal({
      type: ModalType.SUCCESS,
      title: 'Confirmar reserva',
      body: `¿Deseas confirmar tu reserva para la clase seleccionada?
  Recuerda que esta acción garantiza tu cupo en la sesión y no se podrá modificar una vez confirmada. ${name} ${schedule} ${site.name} ${address}`,
      buttonLeft: 'Cancelar',
      buttonRight: 'Confirmar',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'right') return;

      this.reservationService.addReservation({
        id: id,
        name: name,
        date: schedule,
        location: site.name,
        address: address,
        mapUrl: `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`,
      });

      this.modalsService.openSnackbar(SnackbarType.SUCCESS, 'Reserva exitosa');
    });
  }

  /** Obtener nombres únicos de todas las clases */
  getAllClassNames(): string[] {
    const names = this.classes().flatMap((site) =>
      site.classes.map((c) => c.name),
    );
    return [...new Set(names)];
  }

  /** Obtener todas las sedes */
  getAllSites(): string[] {
    const sites = this.classes().map((site) => site.name);
    return [...new Set(sites)];
  }
}
