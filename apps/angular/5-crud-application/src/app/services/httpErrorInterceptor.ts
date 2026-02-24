import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorService } from './errorService';
import { LoadingService } from './loadingService';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  errorMessage = signal<string>('');
  loadingService = inject(LoadingService);
  errorService = inject(ErrorService);
  private totalRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.errorMessage.update(() => 'OK');

    this.totalRequests++;
    if (this.totalRequests === 1) {
      this.loadingService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error:', error);
        this.errorMessage.update(() => error.message);

        this.errorService.show('Error: ' + error.message);

        if (error.status === 401) {
          // handle unauthorized
        }

        if (error.status >= 500) {
          alert('Server error occurred');
        }

        return throwError(() => error);
      }),
    );
  }
}
