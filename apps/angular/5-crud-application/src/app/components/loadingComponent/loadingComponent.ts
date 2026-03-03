import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loadingService/loadingService';

@Component({
  imports: [CommonModule],
  selector: 'app-loading',
  template: `
    @if (loading$ | async) {
      <div class="overlay">
        <div class="spinner"></div>
      </div>
    }

    <!-- <div class="overlay" *ngIf="loading$ | async">
            <div class="spinner"></div>
        </div> -->
  `,
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;
}
