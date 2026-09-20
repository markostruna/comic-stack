import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { CredentialsService, Credentials } from './credentials.service';
import { MockCredentialsService } from './credentials.service.mock';
import { vi } from 'vitest';
import { environment } from '@env/environment';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let credentialsService: MockCredentialsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CredentialsService, useClass: MockCredentialsService },
        AuthenticationService,
      ],
    });

    authenticationService = TestBed.inject(AuthenticationService);
    credentialsService = TestBed.inject(CredentialsService);
    http = TestBed.inject(HttpTestingController);
    credentialsService.credentials = null;
    vi.spyOn(credentialsService, 'setCredentials');
  });

  afterEach(() => http.verify());

  describe('login', () => {
    it('should return credentials', async () => {
      const request = firstValueFrom(
        authenticationService.login({
          username: 'toto',
          password: '123',
        })
      );
      const httpRequest = http.expectOne(`${environment.apiUrl}auth/login`);
      httpRequest.flush({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, username: 'toto', role: 'user' },
      });
      const credentials = await request;
      expect(credentials.token).toBe('access-token');
    });

    it('should authenticate user', async () => {
      expect(credentialsService.isAuthenticated()).toBe(false);
      const request = firstValueFrom(
        authenticationService.login({
          username: 'toto',
          password: '123',
        })
      );
      http.expectOne(`${environment.apiUrl}auth/login`).flush({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, username: 'toto', role: 'user' },
      });
      await request;
      expect(credentialsService.isAuthenticated()).toBe(true);
      expect((credentialsService.credentials as Credentials).token).toBe('access-token');
    });

    it('should persist credentials for the session', async () => {
      const request = firstValueFrom(
        authenticationService.login({
          username: 'toto',
          password: '123',
        })
      );
      http.expectOne(`${environment.apiUrl}auth/login`).flush({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, username: 'toto', role: 'user' },
      });
      await request;
      expect(credentialsService.setCredentials).toHaveBeenCalled();
      expect(vi.mocked(credentialsService.setCredentials).mock.lastCall?.[1]).toBe(undefined);
    });

    it('should persist credentials across sessions', async () => {
      const request = firstValueFrom(
        authenticationService.login({
          username: 'toto',
          password: '123',
          remember: true,
        })
      );
      http.expectOne(`${environment.apiUrl}auth/login`).flush({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, username: 'toto', role: 'user' },
      });
      await request;
      expect(credentialsService.setCredentials).toHaveBeenCalled();
      expect(vi.mocked(credentialsService.setCredentials).mock.lastCall?.[1]).toBe(true);
    });
  });

  describe('logout', () => {
    it('should clear user authentication', async () => {
      // Arrange
      const loginRequest = firstValueFrom(
        authenticationService.login({
          username: 'toto',
          password: '123',
        })
      );
      http.expectOne(`${environment.apiUrl}auth/login`).flush({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, username: 'toto', role: 'user' },
      });
      await loginRequest;
      expect(credentialsService.isAuthenticated()).toBe(true);
      const logoutRequest = firstValueFrom(authenticationService.logout());
      const logoutHttpRequest = http.expectOne(`${environment.apiUrl}auth/logout`);
      expect(logoutHttpRequest.request.body).toEqual({ refreshToken: 'refresh-token' });
      logoutHttpRequest.flush({ ok: true });
      await logoutRequest;
      expect(credentialsService.isAuthenticated()).toBe(false);
      expect(credentialsService.credentials).toBeNull();
    });
  });
});
