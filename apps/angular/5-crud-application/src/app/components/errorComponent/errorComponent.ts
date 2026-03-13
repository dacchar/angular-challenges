import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorService } from '../../services/errorService/errorService';
import { stringOrNull } from '../../types/todoData';

@Component({
  imports: [CommonModule],
  selector: 'app-error',
  template: `
    @if (error$ | async) {
      <div class="error-box">
        {{ errorMessage$ | async }}
      </div>
    }
  `,
  styleUrls: ['./errorComponent.css'],
})
export class ErrorComponent implements OnInit {
  errorService = inject(ErrorService);

  error$: Observable<boolean> = this.errorService.error$;
  errorMessage$: Observable<stringOrNull> = this.errorService.errorMessage$;

  ngOnInit(): void {}
}
