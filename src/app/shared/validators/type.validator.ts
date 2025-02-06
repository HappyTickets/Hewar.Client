import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Type Validator (must be one of specific values)
export function typeValidator(validTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && !validTypes.includes(control.value)
      ? { invalidType: true }
      : null;
  };
}
