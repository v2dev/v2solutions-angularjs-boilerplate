import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function alphabetValidator(): ValidatorFn {
    const ALPHABET_REGEXP = /^[a-zA-Z.\s]+$/i;

    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = ALPHABET_REGEXP.test(control.value);

        if (isValid) {
            return null;
        } else {
            return {
                alphabet: true,
            };
        }
    };

}