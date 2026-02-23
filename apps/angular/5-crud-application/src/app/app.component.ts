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

  // todos: TodoData[] = [];

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todoService.todos = todos;
    });

    // this.http
    //   .get<any[]>('https://jsonplaceholder.typicode.com/todos')
    //   .subscribe((todos) => {
    //     this.todos = todos;
    //   });
  }

  delete(todo: TodoData) {
    this.todoService.delete(todo);
  }

  update(todo: TodoData) {
    this.todoService.update(todo);
  }

  // update(todo: any) {
  //   console.log(todo);
  //   this.http
  //     .put<any>(
  //       `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
  //       JSON.stringify({
  //         todo: todo.id,
  //         title: randText(),
  //         body: todo.body,
  //         userId: todo.userId,
  //       }),
  //       {
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         },
  //       },
  //     )
  //     .subscribe((todoUpdated: any) => {
  //       console.log('todoUpdated', todoUpdated);
  //       this.todos[todoUpdated.id - 1] = todoUpdated;
  //       this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
  //     });
  // }
}
