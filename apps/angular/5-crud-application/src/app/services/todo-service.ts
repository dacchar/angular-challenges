import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { TodoData } from '../models/todoData';
import { ErrorService } from './errorService';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private readonly http = inject(HttpClient);
  private readonly errorService = inject(ErrorService);

  todos: TodoData[] = [];

  getTodos(): Observable<TodoData[]> {
    return this.http.get<TodoData[]>(this.apiUrl);
  }

  delete(todo: TodoData) {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    this.http
      .delete<TodoData>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe();
  }

  update(todo: TodoData) {
    this.errorService.hide();

    this.http
      .put<TodoData>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: TodoData) => {
        this.todos = this.todos.map((t) =>
          t.id === todoUpdated.id ? todoUpdated : t,
        );
      });
  }
}
