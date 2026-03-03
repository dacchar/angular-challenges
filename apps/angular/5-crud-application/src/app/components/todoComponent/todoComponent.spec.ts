import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { TodoComponent } from './todo.component';
import { TodoComponent } from './todoComponent';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  //   let todoServiceSpy: jasmine.SpyObj<TodoService>;
  //   let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    // todoServiceSpy = jasmine.createSpyObj('TodoService', ['delete', 'update']);
    // loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['loading$']);

    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      //   declarations: [TodoComponent],
      //   providers: [
      //     { provide: TodoService, useValue: todoServiceSpy },
      //     { provide: LoadingService, useValue: loadingServiceSpy },
      //   ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  //   it('should call delete method when delete button is clicked', () => {
  //     const todo = { id: 1, title: 'Test Todo', completed: false };
  //     component.todo = todo;
  //     fixture.detectChanges();

  //     const deleteButton = fixture.debugElement.nativeElement.querySelector('button:nth-child(2)');
  //     deleteButton.click();

  //     expect(todoServiceSpy.delete).toHaveBeenCalledWith(todo);
  //   });

  //   it('should call update method when update button is clicked', () => {
  //     const todo = { id: 1, title: 'Test Todo', completed: false };
  //     component.todo = todo;
  //     fixture.detectChanges();

  //     const updateButton = fixture.debugElement.nativeElement.querySelector('button:nth-child(1)');
  //     updateButton.click();

  //     expect(todoServiceSpy.update).toHaveBeenCalledWith(todo);
  //   });

  //   it('should display "Wait..." message after 2 seconds when update method is called', () => {
  //     const todo = { id: 1, title: 'Test Todo', completed: false };
  //     component.todo = todo;
  //     fixture.detectChanges();

  //     const updateButton = fixture.debugElement.nativeElement.querySelector('button:nth-child(1)');
  //     updateButton.click();

  //     expect(component.showWaitMessage).toBeFalsy();

  //     flushMicrotasks();

  //     expect(component.showWaitMessage).toBeTruthy();

  //     tick(2000);

  //     expect(component.showWaitMessage).toBeFalsy();
  //   });
});
