import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validate Date of Birth (Must be at least 18 years old)
export function adultValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 ? null : { underage: true };
  };
}
