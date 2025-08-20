import { Component, inject, signal, OnInit } from '@angular/core';
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
  // Injects
  private authService = inject(AuthService);
  private classService = inject(ClassService);
  private reservationService = inject(ReservationService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  // Signals
  classes = signal<Site[]>([]);

  /** Inicilizador */
  ngOnInit() {
    this.classes.set(this.classService.getClasses());
  }

  /** Maneja la reserva de una nueva clase */
  reserveClass(site: Site, information: Class) {
    this.reservationService.addReservation({
      id: information.id,
      name: information.name,
      date: information.schedule,
      location: site.name,
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
}
