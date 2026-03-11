import { FormControl } from '@angular/forms';
import { titleValidator } from './titleValidator';

describe('titleValidator', () => {
  it('should return null if the title is not empty or contains only whitespace', () => {
    // const control = new FormControl('Valid Title');
    // const result = titleValidator()(control);
    // const result = checkTitleValidator('Valid title');
    // expect(result).toBeNull();
    expect(checkTitleValidator('Valid title')).toBeNull();
  });

  it('should return an error object if the title is empty', () => {
    const control = new FormControl('');
    const result = titleValidator()(control);
    expect(result).toEqual({ required: true });
  });

  it('should return an error object if the title contains only whitespace', () => {
    const control = new FormControl('   ');
    const result = titleValidator()(control);
    expect(result).toEqual({ required: true });
  });
});

function checkTitleValidator(title: string) {
  const control = new FormControl(title);
  const result = titleValidator()(control);

  return result;
}
