import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private classes = [
    {
      id: '1',
      name: 'Crossfit',
      schedule: 'Lunes y Miércoles - 7:00 am',
      location: 'Sede Norte',
      lat: 4.711, // Bogotá Norte aprox
      lng: -74.0667,
      image: 'branch.png',
    },
    {
      id: '2',
      name: 'Yoga',
      schedule: 'Martes y Jueves - 6:00 pm',
      location: 'Sede Centro',
      lat: 4.6097, // Centro de Bogotá
      lng: -74.0817,
      image: 'branch.png',
    },
    {
      id: '3',
      name: 'Spinning',
      schedule: 'Viernes - 7:00 pm',
      location: 'Sede Sur',
      lat: 4.5793, // Sur de Bogotá
      lng: -74.1469,
      image: 'branch.png',
    },
  ];

  getClasses() {
    return this.classes;
  }
}
