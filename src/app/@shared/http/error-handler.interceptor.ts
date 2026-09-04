import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((response) => {
      if (!environment.production) {
        log.error('Request error', response);
      }
      return throwError(() => response);
    })
  );
