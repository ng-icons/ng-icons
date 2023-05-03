import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './routes';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
