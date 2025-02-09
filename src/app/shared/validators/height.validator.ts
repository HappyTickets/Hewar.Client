import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validate Height (Must be between 50cm and 250cm)
export function heightValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const height = Number(control.value);
    return height >= 50 && height <= 250 ? null : { invalidHeight: true };
  };
}
