import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthenticationService } from '@app/auth/authentication.service';
import { CredentialsService } from '@app/auth/credentials.service';
import { environment } from '@env/environment';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const credentialsService = inject(CredentialsService);
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const isAuthRequest = request.url.startsWith(`${environment.apiUrl}auth/`);
  const credentials = credentialsService.credentials;
  const authorizedRequest =
    credentials && !isAuthRequest
      ? request.clone({ setHeaders: { Authorization: `Bearer ${credentials.token}` } })
      : request;

  return next(authorizedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthRequest || !credentials?.refreshToken) {
        return throwError(() => error);
      }

      return authenticationService.refresh().pipe(
        switchMap(() =>
          next(request.clone({ setHeaders: { Authorization: `Bearer ${credentialsService.credentials!.token}` } }))
        ),
        catchError((refreshError) => {
          credentialsService.setCredentials();
          void router.navigate(['/login'], { replaceUrl: true });
          return throwError(() => refreshError);
        })
      );
    })
  );
};
