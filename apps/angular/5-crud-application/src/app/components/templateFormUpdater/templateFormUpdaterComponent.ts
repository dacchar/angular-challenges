import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoData, TodoDataImpl } from '../../models/todoData';
import { TodoService } from '../../services/todoService/todo-service';

@Component({
  selector: 'app-template-form-updater-component',
  imports: [FormsModule],
  templateUrl: './templateFormUpdaterComponent.html',
  styleUrl: './templateFormUpdaterComponent.css',
})
export class TemplateFormUpdaterComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);

  updateMode: 'new' | 'update' = 'new';

  protected id!: number;
  protected model: TodoData = new TodoDataImpl();

  form: any; // access to form

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // it is possible to use snapshot or router component binding
      this.id = +params.get('id')!;
      console.log(this.id);
      if (this.id) {
        this.updateMode = 'update';
        this.todoService.getTodo(this.id).subscribe((todo) => {
          this.model = todo;
        });
      } else {
        this.updateMode = 'new';
      }
    });

    // if(this.route.snapshot.routeConfig!.path !== 'courses/add'){
    //   this.id = parseInt(this.route.snapshot.params['id'])
    //   this.orderService.retrieveCourse(this.id).subscribe(
    //     data => this.course = data
    //   )
    // }
  }

  save(): void {
    if (this.updateMode === 'new') {
    } else {
      this.todoService.update(this.model, false);
      this.router.navigate(['todos']);
    }

    // if(this.route.snapshot.routeConfig!.path === 'courses/add'){
    //   this.orderService.createCourse(this.course).subscribe(
    //     data => {
    //       this.router.navigate(["courses"]);
    //     }
    //   )
    // } else {
    //   this.orderService.updateCourse(this.id, this.course).subscribe(
    //     data => {
    //       this.router.navigate(["courses"]);
    //     }
    //   )
    // }
  }

  cancel(): void {
    this.router.navigate(['todos']);
  }
}
