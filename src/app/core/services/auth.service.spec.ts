import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ModalsService, SnackbarType } from '@shared/services/modals.service';

describe('AuthService', () => {
  let service: AuthService;
  let modalsServiceSpy: jasmine.SpyObj<ModalsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ModalsService', ['openSnackbar']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: ModalsService, useValue: spy }],
    });

    service = TestBed.inject(AuthService);
    modalsServiceSpy = TestBed.inject(
      ModalsService,
    ) as jasmine.SpyObj<ModalsService>;
  });

  describe('login', () => {
    it('should login successfully with valid credentials', (done) => {
      service.login('nttdata', 'nttdata').subscribe((result) => {
        expect(result).toEqual({ username: 'nttdata' });
        expect(service.isAuthenticated()).toBeTrue();
        expect(service.currentUser()).toEqual({ username: 'Santiago Avila' });
        done();
      });
    });

    it('should fail with invalid credentials', (done) => {
      service.login('wrong', 'user').subscribe({
        next: () => fail('Expected error, not success'),
        error: (err) => {
          expect(err).toEqual(new Error('Credenciales inválidas'));
          expect(service.isAuthenticated()).toBeFalse();
          done();
        },
      });
    });
  });

  describe('logout', () => {
    it('should clear currentUser and show snackbar', () => {
      // primero simular login
      service['currentUser'].set({ username: 'FakeUser' });

      service.logout();

      expect(service.isAuthenticated()).toBeFalse();
      expect(modalsServiceSpy.openSnackbar).toHaveBeenCalledWith(
        SnackbarType.INFORMATION,
        'Sesión cerrada',
      );
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if currentUser is set', () => {
      service['currentUser'].set({ username: 'TestUser' });
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if currentUser is null', () => {
      service['currentUser'].set(null);
      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});
