import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
  provideZoneChangeDetection,
  ErrorHandler,
  APP_INITIALIZER
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
  Router
} from '@angular/router';
import { SwBootstrap } from './core/services/updates/sw-bootstrap';
import * as Sentry from '@sentry/angular';
import { environment } from '../environments/environment';

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
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
