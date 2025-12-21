import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandlerService } from './global-error-handler.service';
//
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withComponentInputBinding()),
  provideHttpClient(),
  provideAnimationsAsync('noop'),
  { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    //https://www.youtube.com/watch?v=XJTc-Sy3JxQ   ...global error handling angular 18
  ]
};
