import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
// import { httpFuncErrorInterceptor } from './services/httpFuncErrorInterceptor';
import { HttpErrorInterceptor } from './services/httpErrorInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient(),
    // provideHttpClient(withInterceptors([httpFuncErrorInterceptor]))
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
};
