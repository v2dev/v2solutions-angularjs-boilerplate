import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
    const NUMERIC_REGEXP = /^[0-9]+$/i;

    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = NUMERIC_REGEXP.test(control.value);

        if (isValid) {
            return null;
        } else {
            return {
                numeric: true,
            };
        }
    };
}