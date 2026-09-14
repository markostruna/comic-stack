/*
 * Entry point of the application.
 * Only platform bootstrapping code should be here.
 * For app-specific initialization, use `app/app.component.ts`.
 */

import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';

import { apiPrefixInterceptor, errorHandlerInterceptor } from '@shared';
import { AppComponent } from '@app/app.component';
import { routes } from '@app/app-routing.module';
import { environment } from '@env/environment';
import { register } from 'swiper/element/bundle';

register();

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiPrefixInterceptor, errorHandlerInterceptor])),
    provideNoopAnimations(),
    importProvidersFrom(TranslateModule.forRoot()),
    importProvidersFrom(ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })),
  ],
}).catch((err) => console.error(err));
