import { FormGroup } from '@angular/forms';

export function checkMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.checkMatch) {
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ checkMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
