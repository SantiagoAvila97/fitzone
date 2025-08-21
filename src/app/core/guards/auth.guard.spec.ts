import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authSpy }],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should allow activation if authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    spyOn(router, 'navigateByUrl');

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any),
    );

    expect(result).toBeTrue();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should prevent activation and navigate if not authenticated', () => {
    spyOn(router, 'navigateByUrl');
    authService.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any),
    );

    expect(result).toBeFalse();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
