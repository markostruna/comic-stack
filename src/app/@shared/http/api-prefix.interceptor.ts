import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
export const apiPrefixInterceptor: HttpInterceptorFn = (request, next) => {
  if (!/^(http|https):/i.test(request.url) && request.url.indexOf('api') < 0) {
    request = request.clone({ url: environment.serverUrl + request.url });
  }

  return next(request);
};
