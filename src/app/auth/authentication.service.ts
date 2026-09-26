import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { environment } from '@env/environment';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Handles access and refresh tokens issued by the API.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private credentialsService = inject(CredentialsService);

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.http
      .post<{
        accessToken: string;
        refreshToken: string;
        user: { id: number; username: string; role: 'admin' | 'user' };
      }>(`${environment.apiUrl}auth/login`, { username: context.username, password: context.password })
      .pipe(
        map((response) => ({
          id: response.user.id,
          username: response.user.username,
          role: response.user.role,
          token: response.accessToken,
          refreshToken: response.refreshToken,
        })),
        tap((credentials) => this.credentialsService.setCredentials(credentials, context.remember))
      );
  }

  refresh(): Observable<Credentials> {
    const current = this.credentialsService.credentials;
    return this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}auth/refresh`, { refreshToken: current?.refreshToken })
      .pipe(
        map((response) => ({ ...current!, token: response.accessToken })),
        tap((credentials) => this.credentialsService.setCredentials(credentials, !!current?.refreshToken))
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    const refreshToken = this.credentialsService.credentials?.refreshToken;
    return this.http.post(`${environment.apiUrl}auth/logout`, { refreshToken }).pipe(
      map(() => true),
      tap(() => this.credentialsService.setCredentials())
    );
  }
}
