import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { TodoData } from '../../models/todoData';
import { HttpErrorInterceptor } from '../../services/httpErrorInterceptor/httpErrorInterceptor';
import { LoadingService } from '../../services/loadingService/loadingService';
import { TodoService } from '../../services/todoService/todo-service';
import { ErrorComponent } from '../errorComponent/errorComponent';
import { LoadingComponent } from '../loadingComponent/loadingComponent';
import { TodoComponent } from '../todoComponent/todoComponent';

@Component({
  imports: [CommonModule, LoadingComponent, ErrorComponent, TodoComponent],
  selector: 'app-root',
  template: `
    <div>'------------------ signal test ----------------'</div>
    <br />
    <button (click)="signal()">Signal</button>
    {{ count() }}
    <div>'------------------ signal test end ----------------'</div>
    <br />

    <app-error></app-error>

    {{ loadingMessage$ | async }}
    <br />

    <app-loading></app-loading>
    <br />
    {{ waitMessage }}
    <br />
    <br />

    {{ httpErrorInerceptor.errorMessage() }}
    @for (todo of this.todoService.todos; track todo.id) {
      {{ todo.userId }}
      {{ todo.id }}
      {{ todo.title }}
      <!-- <button (click)="update(todo)" [disabled]="(loadingMessage$ | async) && todo === selectedTodo">Update</button>
      <button (click)="delete(todo)" [disabled]="(loadingMessage$ | async) && todo === selectedTodo">Delete</button> -->
      <!-- comp: -->
      <app-todo
        [todo]="todo"
        (outputEvent)="handleWaitMessage($event)"></app-todo>
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
  selectedTodo: TodoData | null = null;

  waitMessage: string | null = null;

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
    this.selectedTodo = todo;
    this.todoService.update(todo);
  }

  signal(): void {
    this.count.set(this.count() + 1);
  }

  handleWaitMessage(waitMessage: string): void {
    this.waitMessage = waitMessage;
    timer(2000).subscribe(() => {
      this.waitMessage = null;
    });
  }
}
