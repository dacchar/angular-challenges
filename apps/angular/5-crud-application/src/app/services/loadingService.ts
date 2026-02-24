// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private loadingMessageSubject = new BehaviorSubject<string>('');
  loadingMessage$ = this.loadingMessageSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
    this.loadingMessageSubject.next('Loading...');
  }

  hide() {
    this.loadingSubject.next(false);
    this.loadingMessageSubject.next('');
  }
}
