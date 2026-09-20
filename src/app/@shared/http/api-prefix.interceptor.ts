import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '@env/environment';

/**
 * Prefixes legacy relative library requests with the server URL.
 * API requests use environment.apiUrl directly and are never rewritten here.
 */
export const apiPrefixInterceptor: HttpInterceptorFn = (request, next) => {
  const hasAbsoluteUrl = /^(http|https):/i.test(request.url);
  const hasServerPrefix = request.url.startsWith(environment.serverUrl);

  const isApiRequest = request.url.startsWith('/api/') || request.url.startsWith(environment.apiUrl);

  if (!hasAbsoluteUrl && !hasServerPrefix && !isApiRequest) {
    request = request.clone({ url: environment.serverUrl + request.url });
  }

  return next(request);
};
