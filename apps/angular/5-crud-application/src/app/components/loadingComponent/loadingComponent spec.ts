import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../services/loadingService/loadingService';
import { LoadingComponent } from './loadingComponent';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingServiceMock: { loading$: BehaviorSubject<boolean> };

  beforeEach(async () => {
    // Create mock service with BehaviorSubject
    loadingServiceMock = {
      loading$: new BehaviorSubject<boolean>(false),
    };

    await TestBed.configureTestingModule({
      imports: [LoadingComponent, CommonModule],
      providers: [{ provide: LoadingService, useValue: loadingServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should show spinner when loading is true', () => {
    loadingServiceMock.loading$.next(true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  test('should hide spinner when loading is false', () => {
    loadingServiceMock.loading$.next(false);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeNull();
  });
});
