import { Injectable } from '@angular/core';

export interface Site {
  name: string;
  address: string;
  schedule: string;
  lat: number;
  lng: number;
  classes: Class[];
}

export interface Class {
  id: string;
  name: string;
  schedule: string;
}

@Injectable({ providedIn: 'root' })
export class ClassService {
  private classes: Site[] = [
    {
      name: 'Sede Pepe Sierra',
      address: 'Calle 116 # 19 - 41',
      schedule: '5h - 22h',
      lat: 4.711,
      lng: -74.0667,
      classes: [
        {
          id: '1',
          name: 'Crossfit',
          schedule: 'Lunes - 7:00 am',
        },
        {
          id: '2',
          name: 'Yoga',
          schedule: 'Lunes - 9:00 am',
        },
        {
          id: '3',
          name: 'Spinning',
          schedule: 'Martes - 7:00 am',
        },
        {
          id: '4',
          name: 'Crossfit',
          schedule: 'Martes - 6:00 pm',
        },
        {
          id: '5',
          name: 'Pilates',
          schedule: 'Miércoles - 8:00 am',
        },
        {
          id: '6',
          name: 'Funcional',
          schedule: 'Jueves - 7:00 pm',
        },
        {
          id: '7',
          name: 'Zumba',
          schedule: 'Viernes - 6:30 pm',
        },
      ],
    },
    {
      name: 'Sede Fontibón',
      address: 'Calle 17 # 112 - 58',
      schedule: '6h - 21h',
      lat: 4.6097,
      lng: -74.0817,
      classes: [
        {
          id: '9',
          name: 'Kickboxing',
          schedule: 'Lunes - 7:00 pm',
        },
        {
          id: '8',
          name: 'Yoga',
          schedule: 'Martes  - 6:00 pm',
        },
        {
          id: '10',
          name: 'Crossfit',
          schedule: 'Miércoles - 6:00 am',
        },
        {
          id: '14',
          name: 'Yoga',
          schedule: 'Jueves - 6:00 pm',
        },
      ],
    },
    {
      name: 'Sede Bacata',
      address: 'Calle 19 # 5 - 30',
      schedule: '7h - 20h',
      lat: 4.5793,
      lng: -74.1469,
      classes: [
        {
          id: '11',
          name: 'Spinning',
          schedule: 'Viernes - 7:00 pm',
        },
        {
          id: '12',
          name: 'Pilates',
          schedule: 'Sábado - 8:00 am',
        },
        {
          id: '13',
          name: 'Zumba',
          schedule: 'Domingo - 10:00 am',
        },
      ],
    },
  ];

  getClasses() {
    return this.classes;
  }
}
