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
  selectedSites = signal<string[]>([]);

  /** Inicilizador */
  ngOnInit() {
    this.classes.set(this.classService.getClasses());
  }

  /** Filtrar clases */
  filteredClasses = computed(() => {
    const names = this.selectedNames(); // filtro por clase
    const sites = this.selectedSites(); // filtro por sede
    const reserved = this.reservationService.reservations(); // clases ya reservadas
    const isAuth = this.authService.isAuthenticated(); // booleano

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
  /** Obtener todas las sedes */
  getAllSites(): string[] {
    const sites = this.classes().map((site) => site.name);
    return [...new Set(sites)];
  }

  /** Obtener turnos de horarios (mañana / tarde) */
  getAllShifts(): string[] {
    const shifts = this.classes().flatMap((site) =>
      site.classes.map((c) =>
        c.schedule.toLowerCase().includes('am') ? 'mañana' : 'tarde',
      ),
    );
    return [...new Set(shifts)];
  }
}
