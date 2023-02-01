import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): any {
        //return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));

        return control?.invalid && (control.dirty || control.touched);
    }
}