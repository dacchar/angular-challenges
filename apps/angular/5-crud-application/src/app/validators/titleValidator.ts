import { AbstractControl, ValidatorFn } from '@angular/forms';

// Define the custom validator function
export function titleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Check if the title is empty or contains only whitespace characters
    if (!control.value || /^\s*$/.test(control.value)) {
      return { required: true };
    }
    return null;
  };
}
