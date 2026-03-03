// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject.asObservable();

  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$: Observable<string | null> =
    this.errorMessageSubject.asObservable();

  show(message: string): void {
    this.errorSubject.next(true);
    this.errorMessageSubject.next(message);
  }

  hide(): void {
    this.errorSubject.next(false);
    this.errorMessageSubject.next(null);
  }
}
