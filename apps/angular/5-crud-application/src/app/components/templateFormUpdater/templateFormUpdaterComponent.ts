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
  protected id!: number;
  protected model: TodoData = new TodoDataImpl();

  private todoService = inject(TodoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  updateMode: 'new' | 'update' = 'new';

  constructor() {
    console.log('The form constructor');
  }

  ngOnInit(): void {
    console.log('The form');

    // this.route.paramMap.subscribe(params => {
    //   this.id = +params.get('id')!;
    //   if (this.id) {
    //     this.updateMode = 'update';
    //     // this.loadCourse(id);
    //   } else {
    //     this.updateMode = 'new';
    //   }
    // })

    // if(this.route.snapshot.routeConfig!.path !== 'courses/add'){
    //   this.id = parseInt(this.route.snapshot.params['id'])
    //   this.orderService.retrieveCourse(this.id).subscribe(
    //     data => this.course = data
    //   )
    // }
  }

  save(): void {
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
    this.router.navigate(['courses']);
  }
}
