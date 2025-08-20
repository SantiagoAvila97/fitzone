// core/services/reservation.service.ts
import { Injectable, signal } from '@angular/core';

export interface Reservation {
  id: string;
  name: string;
  date: string;
  location: string;
  mapUrl: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly STORAGE_KEY = 'fitzone_reservations';

  // Signal que contiene las reservas actuales
  reservations = signal<Reservation[]>(this.loadFromStorage());

  constructor() {}

  /** Reservar una clase */
  addReservation(r: Reservation) {
    const current = this.reservations();
    const updated = [...current, r];
    this.reservations.set(updated);
    this.saveToStorage(updated);
  }

  /** Eliminar reserva */
  cancelReservation(id: string) {
    const updated = this.reservations().filter((r) => r.id !== id);
    this.reservations.set(updated);
    this.saveToStorage(updated);
  }

  /** Cargar reservas desde LocalStorage */
  private loadFromStorage(): Reservation[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /** Guardar reservas en LocalStorage */
  private saveToStorage(data: Reservation[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}
