import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validate Weight (Must be between 20kg and 500kg)
export function weightValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const weight = Number(control.value);
    return weight >= 20 && weight <= 500 ? null : { invalidWeight: true };
  };
}
