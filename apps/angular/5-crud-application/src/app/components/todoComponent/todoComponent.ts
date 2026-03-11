import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { LoadingService } from '../../services/loadingService/loadingService';
import { TodoService } from '../../services/todoService/todo-service';
import { TodoData } from '../../types/todoData';

@Component({
  imports: [CommonModule],
  selector: 'app-todo',
  template: `
    <span>
      <button (click)="update(todo)" [disabled]="isDisabled()">Update</button>
      <button (click)="delete(todo)" [disabled]="isDisabled()">Delete</button>
      <button (click)="updateTemplateForm(todo)" [disabled]="isDisabled()">
        Update with template form
      </button>
      <button (click)="updateReactiveForm(todo)" [disabled]="isDisabled()">
        Update with reactive form
      </button>
      @if (showWaitMessage) {
        Wait...
      }
    </span>
  `,
  styles: [],
})
export class TodoComponent {
  todoService = inject(TodoService);
  loadingService = inject(LoadingService);
  private router = inject(Router);

  @Input() todo: TodoData = {} as TodoData;
  selectedTodo: TodoData = {} as TodoData;
  @Output() outputEvent = new EventEmitter<string>();

  showWaitMessage = false;

  delete(todo: TodoData) {
    this.todoService.delete(todo);
  }

  update(todo: TodoData): void {
    this.displayWaitMessage();
    this.selectedTodo = todo;
    this.todoService.update(todo);
  }

  updateTemplateForm(todo: TodoData): void {
    this.router.navigate([`todos/${todo.id}/update`]);
  }

  updateReactiveForm(todo: TodoData): void {
    // this.router.navigate([`todos/${todo.id}/updateReactive`]);
    this.router.navigate(['todos', todo.id, 'updateReactive']);
  }

  displayWaitMessage(): void {
    this.outputEvent.emit('Wait message from child component...');

    this.showWaitMessage = true;
    timer(2000).subscribe(() => {
      this.showWaitMessage = false;
    });
  }

  isDisabled(): boolean {
    return this.loadingService.loading$ && this.todo === this.selectedTodo;
  }
}
