// core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal para guardar el estado del usuario autenticado
  currentUser = signal<{ username: string } | null>(null);

  // Usuario mockeado
  private readonly mockUser = {
    username: 'Santiago Avila',
    password: 'pruebatecnisasantiagoavila',
  };

  /** Método para iniciar sesión */
  login(username: string, password: string): Observable<{ username: string }> {
    if (
      username === this.mockUser.username &&
      password === this.mockUser.password
    ) {
      this.currentUser.set({ username });
      return of({ username }).pipe(delay(1000)); // simulamos delay de API
    }

    return throwError(() => new Error('Credenciales inválidas'));
  }

  /** Método para cerrar sesión */
  logout() {
    this.currentUser.set(null);
  }

  /** Retorna si el usuario está autenticado */
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
