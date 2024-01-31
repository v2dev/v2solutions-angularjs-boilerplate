import { FormGroup } from "@angular/forms";

export function matchValue(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): any => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (!control || !matchingControl) {
            return null;
        }
        if (matchingControl.errors && !matchingControl.errors["matchValue"]) {
            return null;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ misMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}