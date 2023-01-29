import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { patternValidator } from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValid:boolean=true;
  ngForm!:FormGroup;
  error:boolean=false
  destroy$: Subject<boolean> = new Subject();
  hide = true;
  passwordCtrl!: FormControl;
  emailCtrl!:FormControl;
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.initFormControls()
    this.initForm()
  }

  initForm(){
    this.ngForm= this.fb.group({
       username:this.emailCtrl,
       password:this.passwordCtrl
    },
    {Validators:[patternValidator()]}
    )
  }

  initFormControls(){
    this.emailCtrl = this.fb.control('',Validators.email);
    this.passwordCtrl = this.fb.control('', Validators.required);
  }

  submit(){
    console.log('element for login '+ JSON.stringify(this.ngForm.value))
    this.router.navigateByUrl('layout')

  }

//   get f(): { [key: string]: AbstractControl} {
//     return this.ngForm.controls;
// }

ngOnDestroy(): void {
  this.destroy$.next(true);
  this.destroy$.complete();
}

getFormControlErrorText(ctrl: AbstractControl) {
  if (ctrl.hasError('required')) {
    return 'Ce champ est requis';
  } else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse mail valide';
  } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
  } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
  }
  else if (ctrl.hasError('patternValidator')) {
    return 'l\email n\'est pas valid';
   } 
  
  else {
      return 'Ce champ contient une erreur';
  }
}



}
