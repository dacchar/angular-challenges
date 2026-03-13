import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from '../../services/errorService/errorService';
import { stringOrNull } from '../../types/todoData';
import { ErrorComponent } from './errorComponent';

describe('ErrorComponent', () => {
  let fixture: ComponentFixture<ErrorComponent>;

  // create controllable streams
  let errorSubject: BehaviorSubject<boolean>;
  let messageSubject: BehaviorSubject<stringOrNull>;

  const mockErrorService = {
    error$: new BehaviorSubject<boolean>(false),
    errorMessage$: new BehaviorSubject<stringOrNull>(null),
  };

  beforeEach(async () => {
    errorSubject = mockErrorService.error$;
    messageSubject = mockErrorService.errorMessage$;

    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
      providers: [
        {
          provide: ErrorService,
          useValue: mockErrorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    fixture.detectChanges();
  });

  it('should not render error box when there is no error', () => {
    const errorBox = fixture.debugElement.query(By.css('.error-box'));
    expect(errorBox).toBeNull();
  });

  it('should render error box with message when error is true', () => {
    errorSubject.next(true);
    messageSubject.next('Something went wrong');
    fixture.detectChanges();

    const errorBox = fixture.debugElement.query(By.css('.error-box'));
    expect(errorBox).not.toBeNull();
    expect(errorBox.nativeElement.textContent).toContain(
      'Something went wrong',
    );
  });

  it('should update message when error message changes', () => {
    errorSubject.next(true);
    messageSubject.next('First error');
    fixture.detectChanges();

    let errorBox = fixture.debugElement.query(By.css('.error-box'));
    expect(errorBox.nativeElement.textContent).toContain('First error');

    messageSubject.next('Second error');
    fixture.detectChanges();

    errorBox = fixture.debugElement.query(By.css('.error-box'));
    expect(errorBox.nativeElement.textContent).toContain('Second error');
  });
});
