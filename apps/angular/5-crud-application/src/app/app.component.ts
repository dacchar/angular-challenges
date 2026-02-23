import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TodoData } from './models/todoData';
import { TodoService } from './services/todo-service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
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

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todoService.todos = todos;
    });
  }

  delete(todo: TodoData) {
    this.todoService.delete(todo);
  }

  update(todo: TodoData) {
    this.todoService.update(todo);
  }
}
