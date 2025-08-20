import { Injectable, signal } from '@angular/core';

export interface Membership {
  id: number;
  name: string;
  price: number;
  inscription: number;
  extra: number;
  fidelity: boolean;
  benefits: { label: string; included: boolean }[];
}

@Injectable({ providedIn: 'root' })
export class MembershipsService {
  private membershipsSignal = signal<Membership[]>([
    {
      id: 1,
      name: 'Plan BlackZone',
      price: 109900,
      inscription: 9900,
      extra: 89000,
      fidelity: true,
      benefits: [
        {
          label: 'Acceso ilimitado a más de 1.700 sedes de la red',
          included: true,
        },
        { label: 'Derecho a traer un invitado 5 veces al mes', included: true },
        {
          label: 'Smart Spa (Relájate en los sillones de masajes)',
          included: true,
        },
        { label: 'Descuentos especiales en marcas aliadas', included: true },
        {
          label: 'Smart Fit App (Tu plan de entrenamiento personalizado)',
          included: true,
        },
        { label: 'Smart Vital (Seguimiento a tu progreso)', included: true },
        { label: 'Smart Fit Go (Entrenamientos en línea)', included: true },
        { label: 'Clases grupales con profesores', included: true },
        { label: 'Acceso a todas las áreas de la sede', included: true },
      ],
    },
    {
      id: 2,
      name: 'Plan FitZone',
      price: 99900,
      inscription: 29900,
      extra: 89000,
      fidelity: true,
      benefits: [
        {
          label: 'Acceso ilimitado a más de 1.700 sedes de la red',
          included: false,
        },
        {
          label: 'Derecho a traer un invitado 5 veces al mes',
          included: false,
        },
        {
          label: 'Smart Spa (Relájate en los sillones de masajes)',
          included: false,
        },
        { label: 'Descuentos especiales en marcas aliadas', included: false },
        {
          label: 'Smart Fit App (Tu plan de entrenamiento personalizado)',
          included: true,
        },
        { label: 'Smart Vital (Seguimiento a tu progreso)', included: true },
        { label: 'Smart Fit Go (Entrenamientos en línea)', included: true },
        { label: 'Clases grupales con profesores', included: true },
        { label: 'Acceso a todas las áreas de la sede', included: true },
      ],
    },
    {
      id: 3,
      name: 'Plan SmartZone',
      price: 119900,
      inscription: 29900,
      extra: 89000,
      fidelity: false,
      benefits: [
        {
          label: 'Acceso ilimitado a más de 1.700 sedes de la red',
          included: false,
        },
        {
          label: 'Derecho a traer un invitado 5 veces al mes',
          included: false,
        },
        {
          label: 'Smart Spa (Relájate en los sillones de masajes)',
          included: false,
        },
        { label: 'Descuentos especiales en marcas aliadas', included: false },
        {
          label: 'Smart Fit App (Tu plan de entrenamiento personalizado)',
          included: true,
        },
        { label: 'Smart Vital (Seguimiento a tu progreso)', included: true },
        { label: 'Smart Fit Go (Entrenamientos en línea)', included: true },
        { label: 'Clases grupales con profesores', included: true },
        { label: 'Acceso a todas las áreas de la sede', included: true },
      ],
    },
  ]);

  memberships() {
    return this.membershipsSignal();
  }
}
