import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todoService/todo-service';
import { TodoData } from '../../types/todoData';
import { titleValidator } from '../../validators/titleValidator/titleValidator';

@Component({
  selector: 'app-reactive-form-updater-component',
  imports: [ReactiveFormsModule],
  templateUrl: './reactiveFormUpdaterComponent.html',
  styleUrl: './reactiveFormUpdaterComponent.css',
})
export class ReactiveFormUpdaterComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);
  private formBuilder = inject(FormBuilder);

  updateMode: 'new' | 'update' = 'new';

  protected id!: number;
  protected model: TodoData = {
    userId: undefined,
    id: undefined,
    title: undefined,
    completed: false,
  };

  // profileForm = new FormGroup<{ title: FormControl }>({
  //   title: new FormControl<string>('')
  // });

  todoForm = this.formBuilder.group({
    title: [
      new FormControl<string | null | undefined>(''),
      //[Validators.required]
      [titleValidator()],
    ],
  });

  ngOnInit(): void {
    let aa: boolean = this.todoForm.valid;

    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      console.log(this.id);
      if (this.id) {
        this.updateMode = 'update';
        this.todoService.getTodo(this.id).subscribe((todo) => {
          this.model = todo;
          // this.profileForm.setValue({ title: todo.title ?? '' });
          this.todoForm.setValue({ title: todo.title });
          //console.log(this.profileForm.value);
          //console.log("title: " + this.profileForm.value.title);
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
      // const merged = { ...this.model, ...this.profileForm.value };
      // console.log('Merged: ', merged);
      // this.model.title = this.profileForm.value.title;
      // this.todoService.update(this.model, false);

      this.todoService.update({ ...this.model, ...this.todoForm.value }, false);

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
