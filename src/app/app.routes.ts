import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./screens/public/auth/auth.component').then(
        (m) => m.AuthComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./screens/private/home/home.component').then(
        (m) => m.HomeComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import(
        './screens/private/reservation-list/reservation-list.component'
      ).then((m) => m.ReservationListComponent),
    canActivate: [authGuard],
  },
];
