import { TestBed } from '@angular/core/testing';
import { ReservationService, Reservation } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    // limpiar localStorage antes de cada test
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [ReservationService],
    });
    service = TestBed.inject(ReservationService);
  });

  it('should add a reservation and persist it', () => {
    const reservation: Reservation = {
      id: '1',
      name: 'Yoga',
      date: '2025-08-20',
      location: 'Studio A',
      mapUrl: 'http://map.test',
      address: '123 St',
    };

    service.addReservation(reservation);

    const stored = JSON.parse(localStorage.getItem('fitzone_reservations')!);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe('1');
    expect(service.reservations().length).toBe(1);
  });

  it('should cancel a reservation and persist changes', () => {
    const r1: Reservation = {
      id: '1',
      name: 'Yoga',
      date: '2025-08-20',
      location: 'A',
      mapUrl: '',
      address: '',
    };
    const r2: Reservation = {
      id: '2',
      name: 'Pilates',
      date: '2025-08-21',
      location: 'B',
      mapUrl: '',
      address: '',
    };

    service.addReservation(r1);
    service.addReservation(r2);

    service.cancelReservation('1');

    const stored = JSON.parse(localStorage.getItem('fitzone_reservations')!);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe('2');
    expect(service.reservations().length).toBe(1);
  });

  it('should load reservations from localStorage if available', () => {
    const mockData: Reservation[] = [
      {
        id: '100',
        name: 'Spin',
        date: '2025-08-22',
        location: 'C',
        mapUrl: '',
        address: '',
      },
    ];
    localStorage.setItem('fitzone_reservations', JSON.stringify(mockData));

    const newService = TestBed.inject(ReservationService); // fuerza recarga
    expect(newService.reservations().length).toBe(1);
    expect(newService.reservations()[0].id).toBe('100');
  });

  it('should return empty array if localStorage is empty', () => {
    localStorage.removeItem('fitzone_reservations');
    const newService = TestBed.inject(ReservationService);

    expect(newService.reservations().length).toBe(0);
  });

  it('should save reservations to localStorage', () => {
    const r: Reservation = {
      id: '10',
      name: 'Crossfit',
      date: '2025-08-23',
      location: 'D',
      mapUrl: '',
      address: '',
    };
    service.addReservation(r);

    const stored = JSON.parse(localStorage.getItem('fitzone_reservations')!);
    expect(stored[0].name).toBe('Crossfit');
  });
});
