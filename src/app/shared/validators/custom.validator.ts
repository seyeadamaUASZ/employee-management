import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

    export function patternValidator():ValidatorFn{
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.value) {
                return null;
            }
            return{
                valid :control.value
            } 
        };
    }
