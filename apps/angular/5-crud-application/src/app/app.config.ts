import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpErrorInterceptor } from './services/httpErrorInterceptor/httpErrorInterceptor';
// import { httpFuncErrorInterceptor } from './services/httpFuncErrorInterceptor';
//import { HttpErrorInterceptor } from './services/httpErrorInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(),
    // provideHttpClient(withInterceptors([httpFuncErrorInterceptor]))
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
};
