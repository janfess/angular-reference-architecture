import {
  ApplicationConfig,
  importProvidersFrom, inject,
  isDevMode,
  provideZoneChangeDetection
} from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withHttpTransferCacheOptions,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { SwBootstrap } from './core/services/updates/sw-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'SW_BOOTSTRAP',
      useFactory: () => inject(SwBootstrap),
    },
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    importProvidersFrom(BrowserModule),
    provideClientHydration(
      withIncrementalHydration(),
      withHttpTransferCacheOptions({}),
    ),
    providePrimeNG({
      ripple: false,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
        },
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    provideHttpClient(withFetch()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
