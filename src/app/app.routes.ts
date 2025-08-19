import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./screens/public/auth/auth.component').then(
        (m) => m.AuthComponent,
      ),
  },
];
