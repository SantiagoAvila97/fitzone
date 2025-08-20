import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private classes = [
    {
      id: '1',
      name: 'Crossfit',
      schedule: 'Lunes y Miércoles - 7:00 am',
      location: 'Sede Norte',
      image: 'branch.png',
    },
    {
      id: '2',
      name: 'Yoga',
      schedule: 'Martes y Jueves - 6:00 pm',
      location: 'Sede Centro',
      image: 'branch.png',
    },
    {
      id: '3',
      name: 'Spinning',
      schedule: 'Viernes - 7:00 pm',
      location: 'Sede Sur',
      image: 'branch.png',
    },
  ];

  getClasses() {
    return this.classes;
  }
}
