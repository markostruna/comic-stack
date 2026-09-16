import { Type } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { environment } from '@env/environment';
import { AuthenticationService } from '@app/auth/authentication.service';
import { CredentialsService } from '@app/auth/credentials.service';
import { MockCredentialsService } from '@app/auth/credentials.service.mock';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: CredentialsService, useClass: MockCredentialsService },
        { provide: AuthenticationService, useValue: { refresh: () => of({ token: 'refreshed-token' }) } },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => httpMock.verify());

  it('should attach the access token to API requests', () => {
    http.get(`${environment.apiUrl}comics`).subscribe();

    const request = httpMock.expectOne(`${environment.apiUrl}comics`);
    expect(request.request.headers.get('Authorization')).toBe('Bearer 123');
    request.flush([]);
  });

  it('should not attach the access token to authentication requests', () => {
    http.post(`${environment.apiUrl}auth/login`, {}).subscribe();

    const request = httpMock.expectOne(`${environment.apiUrl}auth/login`);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });
});
