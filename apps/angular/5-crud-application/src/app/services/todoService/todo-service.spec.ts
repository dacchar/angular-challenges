import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoService } from './todo-service';

describe('TodoService', () => {
  let todoService: TodoService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    httpMock = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should return an Observable of TodoData[]', () => {
      const mockResponse = [{ id: 1, title: 'Test Todo', completed: false }];
      jest
        .spyOn(todoService['http'], 'get')
        .mockReturnValueOnce(of(mockResponse));

      todoService.getTodos().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
    });
  });

  describe('getTodo', () => {
    it('should return an Observable of TodoData', () => {
      const mockResponse = { id: 1, title: 'Test Todo', completed: false };
      jest
        .spyOn(todoService['http'], 'get')
        .mockReturnValueOnce(of(mockResponse));

      todoService.getTodo(1).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
    });
  });

  describe('delete', () => {
    it('should delete a todo', () => {
      const todo = { id: 1, title: 'Test Todo', completed: false };
      const mockResponse = {};
      jest
        .spyOn(todoService['http'], 'delete')
        .mockReturnValueOnce(of(mockResponse));

      todoService.todos = [todo];
      todoService.delete(todo);

      expect(todoService.todos).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a todo', () => {
      const todo = { id: 1, title: 'Test Todo', completed: false };
      const mockResponse = { id: 1, title: 'Updated Todo', completed: false };
      jest
        .spyOn(todoService['http'], 'put')
        .mockReturnValueOnce(of(mockResponse));

      todoService.todos = [todo];
      todoService.update(todo);

      expect(todoService.todos).toEqual([mockResponse]);
    });
  });
});
