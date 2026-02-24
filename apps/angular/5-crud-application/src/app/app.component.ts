import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ErrorComponent } from './components/errorComponent';
import { LoadingComponent } from './components/loadingComponent';
import { TodoData } from './models/todoData';
import { HttpErrorInterceptor } from './services/httpErrorInterceptor';
import { LoadingService } from './services/loadingService';
import { TodoService } from './services/todo-service';

@Component({
  imports: [CommonModule, LoadingComponent, ErrorComponent],
  selector: 'app-root',
  template: `
    <app-error></app-error>

    {{ loadingMessage$ | async }}

    {{ count() }}
    <br />
    <button (click)="signal()">Signal</button>
    <br />

    <app-loading></app-loading>

    {{ httpErrorInerceptor.errorMessage() }}
    @for (todo of this.todoService.todos; track todo.id) {
      {{ todo.userId }}
      {{ todo.id }}
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
      <br />
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  todoService = inject(TodoService);
  httpErrorInerceptor = inject(HttpErrorInterceptor);
  loadingService = inject(LoadingService);

  em: string = '';
  count = signal(0);
  loadingMessage$ = this.loadingService.loadingMessage$;

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todoService.todos = todos;
    });

    this.em = this.httpErrorInerceptor.errorMessage();
  }

  delete(todo: TodoData) {
    this.todoService.delete(todo);
  }

  update(todo: TodoData): void {
    this.todoService.update(todo);
  }

  signal(): void {
    this.count.set(this.count() + 1);
  }
}
