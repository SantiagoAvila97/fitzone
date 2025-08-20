import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./screens/private/home/home.component').then(
        (m) => m.HomeComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./screens/public/auth/auth.component').then(
        (m) => m.AuthComponent,
      ),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import(
        './screens/private/reservation-list/reservation-list.component'
      ).then((m) => m.ReservationListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'memberships',
    loadComponent: () =>
      import('./screens/public/memberships/memberships.component').then(
        (m) => m.MembershipsComponent,
      ),
  },
];
