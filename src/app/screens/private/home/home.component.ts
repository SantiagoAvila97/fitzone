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

  // Signals
  classes = signal<Site[]>([]);
  selectedNames = signal<string[]>([]);

  /** Inicilizador */
  ngOnInit() {
    this.classes.set(this.classService.getClasses());
  }
  /** Filtrar clases */
  filteredClasses = computed(() => {
    const names = this.selectedNames();
    const reserved = this.reservationService.reservations(); // clases ya reservadas
    const isAuth = this.authService.isAuthenticated(); // booleano

    return this.classes().map((site) => ({
      ...site,
      classes: site.classes.filter((c) => {
        const matchesFilter = names.length === 0 || names.includes(c.name);

        // si no está autenticado, no revisa reservas
        if (!isAuth) {
          return matchesFilter;
        }

        // si está autenticado, también valida reservas
        const notReserved = !reserved.some(
          (r) => r.id === c.id && r.location === site.name,
        );

        return matchesFilter && notReserved;
      }),
    }));
  });

  /** Maneja la reserva de una nueva clase */
  reserveClass(site: Site, information: Class) {
    this.reservationService.addReservation({
      id: information.id,
      name: information.name,
      date: information.schedule,
      location: site.name,
      address: site.address,
      mapUrl: `https://www.google.com/maps?q=${site.lat},${site.lng}&hl=es;z=14&output=embed`,
    });

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    alert(`Clase ${information.name} reservada ✅`);
    this.router.navigate(['/reservations']);
  }

  /** Sana la URL maps */
  getMapUrl(lat: number, lng: number): SafeResourceUrl {
    const url = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /** Obtener nombres únicos de todas las clases */
  getAllClassNames(): string[] {
    const names = this.classes().flatMap((site) =>
      site.classes.map((c) => c.name),
    );
    return [...new Set(names)];
  }
}
