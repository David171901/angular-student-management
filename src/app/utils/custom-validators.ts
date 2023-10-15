import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lettersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; 
    }

    const valid = /^[A-Za-z\s]+$/.test(control.value);

    return valid ? null : { lettersOnly: true };
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const valid = /^9\d{8}$/.test(control.value);

    return valid ? null : { phoneNumberInvalid: true };
  };
}