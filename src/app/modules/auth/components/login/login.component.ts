import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BasicResponse } from 'src/app/shared/models/utils/basic-response.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
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
  constructor(private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private authS:AuthService,
    private alertService:AlertService,
    private credentialsService:CredentialsService) { }

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
    //console.log('element for login '+ JSON.stringify(this.ngForm.value))
    //this.router.navigateByUrl('layout')

    if(this.ngForm.invalid){
      this.ngForm.markAllAsTouched;
    }else{
      this.authS 
      .signin(this.ngForm.value)
      .pipe(takeUntil(this.destroy$))

      .subscribe({
        next:(b:BasicResponse)=>{
          if(b.status===200){
            console.log(b);
            this.authS.saveUserCredentials(b)
            this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/layout'], { replaceUrl: true });
            const alert = {
              message: `Bienvenue ${this.credentialsService.fullName}`,
              titre: 'Tableau de bord',
              status: 'OK'
          };
          this.alertService.showAlert(alert);
          }else{
            this.alertService.showSwal('KO', null, 'Authentification', 'Login ou mot de passe incorrect!');
          }
        },
        error: (error: any) => this.alertService.showSwal('KO', null, 'Authentification', 'Login ou mot de passe incorrect!')
      })
    }

  }

   get f(): { [key: string]: AbstractControl} {
     return this.ngForm.controls;
 }

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
